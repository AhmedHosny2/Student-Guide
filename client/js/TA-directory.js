// Wrap your code in an event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  function fetchTAData() {
    const apiUrl = `https://ta.ahmed-yehia.me/TADirectory`;
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

      // ... (rest of your card creation code)

      cardContainer.appendChild(card);
    });
  }

  // Call the function to generate and append the cards
  fetchTAData();

  // Add an input event listener to the search bar
  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

<<<<<<< HEAD
    cards.forEach((card) => {
      const courseName = card
        .querySelector(".course")
        .textContent.toLowerCase();
      const isVisible = courseName.includes(searchValue);
      card.classList.toggle("hide", !isVisible);
    });
=======
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
    emailLink.style.color = "gray";
    emailWrap.appendChild(emailLink);
    box.appendChild(emailWrap);

    card.appendChild(courseName);
    card.appendChild(box);

    cardContainer.appendChild(card);
  });
}

// Call the function to generate and append the cards
fetchTAData();

// Add an input event listener to the search bar
const card = document.querySelectorAll(".card");
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();

  // Loop through all the cards
  card.forEach((card) => {
    const courseName = card.querySelector(".course").textContent.toLowerCase();
    const isVisible = courseName.includes(searchValue);
    console.log(isVisible);
    card.style.display = isVisible ? "block" : "none";
    console.log(card);
>>>>>>> 57d6af05d37a580a8fe04fb44a1ec8e729ba47b3
  });
});
