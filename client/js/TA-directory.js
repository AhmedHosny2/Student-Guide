import { taURL, clientLoginURL } from "../utils/env.js";

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("userName") == null)
    window.location.href = clientLoginURL;
  else {
    const avatar = document.querySelector(".avatar i");
    avatar.classList.add("show");
    const loginButton = document.querySelectorAll(".login");
    loginButton.forEach((button) => {
      button.style.display = "none";
    });
  }

  let arr = [];

  function fetchTAData() {
    fetch(taURL+"/getTAs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        generateTACards(data);
        console.log("Response from the API:", data);
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

      const courseName = document.createElement("div");
      courseName.classList.add("course");
      courseName.textContent = ta.courseName;

      const deleteButton = document.createElement("i");
      deleteButton.classList.add('delete-button', "fa-regular", "fa-trash-can");

      deleteButton.addEventListener('click', function () {
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

      const taName = document.createElement("p");
      taName.textContent = ta.name;
      taName.classList.add("ta-name");
      card.appendChild(taName);
    });
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
      const courseName = card
        .querySelector(".course")
        .textContent.toLowerCase();
        console.log(card);
      const isVisible = courseName.includes(searchValue);
      card.classList.toggle("hide", !isVisible);
    });
  });
});
