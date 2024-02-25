import { taURL } from "../utils/env.js";
import { tost } from "./Toastify.js";
let arr = [];
const pageData = document.getElementById("yaya");
const loader = document.getElementById("loader");
let searchInput = document.querySelector("#searchBar");
let searchText = document.querySelector(".search-text");

// Hide the search bar tools
searchInput.style.display = "none";
searchText.style.display = "none";

function fetchTAData() {
  loader.style.display = "flex";
  pageData.style.display = "none";
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
      pageData.style.display = "grid";
      searchText.style.display = '';
      searchInput.style.display = '';
     
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

    let cardHead = document.createElement("div");
    cardHead.classList.add("card-head");


    const courseName = document.createElement("h4");
    courseName.classList.add("course");
    courseName.textContent = ta.courseName;

    const taName = document.createElement("h4");
    taName.textContent = ta.name;
    taName.classList.add("ta-name");
    
    const contactButton = document.createElement("a");
    contactButton.classList.add("contactBtn");
    contactButton.href = `mailto:${ta.email}`;
    contactButton.textContent = "contact";
    
  

    

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
            tost("Something went wrong please infrom the Admin!", "error", 3000);
            throw new Error("Network response was not ok");
          }
         tost("TA deleted successfully!", "success", 3000);
          location.reload();
          return response.json();
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    });
    card.appendChild(deleteButton);


    cardHead.appendChild(taName);
    // cardHead.appendChild(courseName);
    card.appendChild(cardHead)

    cardContainer.appendChild(card);
    arr.push(card);

    card.appendChild(createCardWrap("office hour", ta.officeHours));
    card.appendChild(createCardWrap("office location", ta.officeLocation));


    

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
    cardHead.appendChild(taImage);
    taWrapper.appendChild(courseName)
    // taWrapper.appendChild(taImage);
    taWrapper.appendChild(contactButton)
    card.appendChild(taWrapper);
    card.ap
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
