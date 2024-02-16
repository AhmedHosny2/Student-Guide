import { taURL } from "../utils/env.js";

let arr = [];
// const pageData = document.getElementById("yaya");
// pageData.style.display = "none";
const loader = document.getElementById("loader");
var searchInput = document.querySelector("#searchBar");
var searchText = document.querySelector(".search-text");

// Hide the search bar tools
searchInput.style.display = "none";
searchText.style.display = "none";
loader.style.display = "block";
const loadingDiv = document.getElementById("loadingDiv");
function fetchTAData() {
  fetch(taURL + "/getTaCourses", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        loader.style.display = "none";
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      loader.style.display = "none";
      // searchBarDiv.style.display = "block";
      loadingDiv.style.display = "none";
      searchText.style.display = '';
      searchInput.style.display = '';
      // loader.style.display = "none";
      // pageData.style.display = "grid";
      generateTACards(data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function generateTACards(taData) {
  const cardContainer = document.querySelector(".card-wrap");
  cardContainer.innerHTML = ""; // Clear previous cards

  taData.forEach((ta) => {
    const card = document.createElement("section");
    card.classList.add("card");

    const courseName = document.createElement("p");
    courseName.classList.add("course");
    courseName.textContent = ta.courseName;

    //start delete button
    const deleteButton = document.createElement("i");
    deleteButton.classList.add("delete-button", "fa-regular", "fa-trash-can");

    deleteButton.addEventListener("click", function () {
      fetch(taURL + "/deleteTACourse", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ _id: ta._id }),
      })
        .then((response) => {
          if (!response.ok) {
            alert("TA not found");
            throw new Error("Network response was not ok");
          }
          alert("TA deleted");
          location.reload();
          return response.json();
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    });
    card.appendChild(deleteButton);
    card.appendChild(courseName);

    cardContainer.appendChild(card);
    arr.push(card);

    card.appendChild(createCardWrap("office hour", ta.officeHours));
    card.appendChild(createCardWrap("office location", ta.officeLocation));

    const emailWrap = document.createElement("div");
    emailWrap.classList.add("wrap");

    const emailLabel = document.createElement("p");
    emailLabel.textContent = "email";

    const emailLink = document.createElement("a");
    emailLink.classList.add("answer");
    emailLink.href = `mailto:${ta.email}`;
    emailLink.textContent = ta.email;

    emailWrap.appendChild(emailLabel);
    emailWrap.appendChild(emailLink);

    card.appendChild(emailWrap);

    card.appendChild(createCardWrap("tutorials", ta.tutorials));

    const imgObject = {
      male: "../images/male.svg",
      female: "../images/female.svg",
      croissant: "../images/Croissant.webp",
    };
    const taWrapper = document.createElement("div");
    taWrapper.classList.add("taWrapper");
    const taImage = document.createElement("img");
    taImage.classList.add("genderImg");
    if (ta.gender === "male") {
      taImage.src = imgObject["male"];
    } else if (ta.gender === "female") {
      taImage.src = imgObject["female"];
    } else {
      taImage.src = imgObject["croissant"];
    }

    const taName = document.createElement("p");
    taName.textContent = ta.name;
    taName.classList.add("ta-name");
    taWrapper.appendChild(taImage);
    taWrapper.appendChild(taName);
    card.appendChild(taWrapper);
  });

  const deleteButtons = document.querySelectorAll(
    ".taDirectory .container .card .delete-button"
  );
  if (
    localStorage.getItem("isAdmin") === "false" ||
    localStorage.getItem("isAdmin") == null
  ) {
    deleteButtons.forEach((button) => (button.style.display = "none"));
  }
}

function createCardWrap(label, value) {
  const wrap = document.createElement("div");
  wrap.classList.add("wrap");

  const p = document.createElement("p");
  p.textContent = label;

  const answer = document.createElement("p");
  answer.textContent = value;
  answer.classList.add("answer");

  wrap.appendChild(p);
  wrap.appendChild(answer);
  return wrap;
}

fetchTAData();

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  arr.forEach((card) => {
    const courseName = card.querySelector(".course").textContent.toLowerCase();
    const isVisible = courseName.includes(searchValue);
    card.classList.toggle("hide", !isVisible);
  });
});

// hide admin buttons

const adminBtns = document.querySelector(
  ".taDirectory .container .admin-buttons"
);

if (
  localStorage.getItem("isAdmin") === "false" ||
  localStorage.getItem("isAdmin") == null
) {
  adminBtns.style.display = "none";
}
