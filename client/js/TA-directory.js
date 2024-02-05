const { taURL } = require("../utils/env");
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("userName") == null)
    window.location.href = "https://www.ahmed-yehia.me/html/login.html";
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
    fetch(taURL, {
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
  // Your existing code for generating cards
  function generateTACards(taData) {
    const cardContainer = document.querySelector(".card-wrap");

    taData.forEach((ta) => {
      const card = document.createElement("section");
      card.classList.add("card");

      const courseName = document.createElement("div");
      courseName.classList.add("course");
      courseName.textContent = ta.course; // Replace with the actual course name

      const box = document.createElement("div");
      box.classList.add("box");

      // Helper function to create a card wrap element
      function createCardWrap(label, value) {
        const wrap = document.createElement("div");
        wrap.classList.add("wrap");

        const p = document.createElement("p");
        p.textContent = label;

        const span = document.createElement("span");
        span.textContent = value;

        wrap.appendChild(p);
        wrap.appendChild(span);
        return wrap;
      }

      box.appendChild(createCardWrap("name", ta.name));
      box.appendChild(createCardWrap("office hour", ta.officeHours));
      box.appendChild(createCardWrap("office location", ta.officeLocation));
      box.appendChild(createCardWrap("tutorials", ta.tutorials));

      // Create the email element with a clickable link
      const emailWrap = createCardWrap("email", "");
      const emailLink = document.createElement("a");
      emailLink.href = `mailto:${ta.email}`;
      emailLink.textContent = ta.email;
      emailLink.style.color = "white";
      emailWrap.appendChild(emailLink);
      box.appendChild(emailWrap);

      card.appendChild(courseName);
      card.appendChild(box);

      cardContainer.appendChild(card);
      arr.push(card);
    });
  }
  fetchTAData();

  const card = document.querySelectorAll(".card");
  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    // Loop through all the cards
    arr.forEach((card) => {
      const courseName = card
        .querySelector(".course")
        .textContent.toLowerCase();
      const isVisible = courseName.includes(searchValue);
      card.classList.toggle("hide", !isVisible);
    });
  });
});

// Call the function to generate and append the cards

// Add an input event listener to the search bar
