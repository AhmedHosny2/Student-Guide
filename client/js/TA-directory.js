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

    cards.forEach((card) => {
      const courseName = card
        .querySelector(".course")
        .textContent.toLowerCase();
      const isVisible = courseName.includes(searchValue);
      card.classList.toggle("hide", !isVisible);
    });
  });
});
