// start search bar
const arrOfSubjects = [];
const cards = document.querySelectorAll(".card");
const cardsNames = document.querySelectorAll(".card .course");
cardsNames.forEach((ele) => {
  arrOfSubjects.push(ele.outerText);
});

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  arrOfSubjects.forEach((e, i) => {
    const isVisible = e.toLowerCase().includes(value);
    cards[i].classList.toggle("hide", !isVisible);
  });
});

// yaya
function fetchTAData() {
  const apiUrl = `https://ta.ahmed-yehia.me/TADirectory`; // Replace with your API URL here
  fetch(apiUrl, {
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
      // Handle the response data from the API (e.g., show a success message)
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
// Sample array of TA objects

// Function to generate and append cards
function generateTACards(taData) {
  const cardContainer = document.querySelector(".card-wrap");

  taData.forEach((ta) => {
    const card = document.createElement("section");
    card.classList.add("card");

    const courseName = document.createElement("div");
    courseName.classList.add("course");
    courseName.textContent = taData[0].course; // Replace with the actual course name

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
    box.appendChild(createCardWrap("email", ta.email));

    card.appendChild(courseName);
    card.appendChild(box);

    cardContainer.appendChild(card);
  });
}

// Call the function to generate and append the cards
document.addEventListener("DOMContentLoaded", function () {
  fetchTAData();
});
