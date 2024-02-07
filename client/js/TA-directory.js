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

  function generateTACards(taData) {
    const cardContainer = document.querySelector(".card-wrap");

    taData.forEach((ta) => {
      const card = document.createElement("section");
      card.classList.add("card");

      const courseName = document.createElement("div");
      courseName.classList.add("course");
      courseName.textContent = ta.courseName;

      const deleteButton = document.createElement("button"); // Corrected the element type
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-button');
      deleteButton.style.color = "white";
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

      const box = document.createElement("div"); // Corrected variable name

      box.appendChild(createCardWrap("office hour", ta.officeHours));
      box.appendChild(createCardWrap("office location", ta.officeLocation));
      box.appendChild(createCardWrap("tutorials", ta.tutorials));
      // box.appendChild(createCardWrap("name", ta.name));

      const emailWrap = createCardWrap("email", "");
      const emailLink = document.createElement("a");
      emailLink.href = `mailto:${ta.email}`;
      emailLink.textContent = ta.email;
      emailWrap.appendChild(emailLink);
      box.appendChild(emailWrap);

      //ta name
      const taName = document.createElement("p");
      taName.textContent = ta.name;
      box.appendChild(taName)

      card.appendChild(deleteButton);
      card.appendChild(courseName);
      card.appendChild(box);

      cardContainer.appendChild(card);
      arr.push(card);
    });
  }

  fetchTAData();

  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    arr.forEach((card) => {
      const courseName = card
        .querySelector(".course")
        .textContent.toLowerCase();
      const isVisible = courseName.includes(searchValue);
      card.classList.toggle("hide", !isVisible);
    });
  });
});
