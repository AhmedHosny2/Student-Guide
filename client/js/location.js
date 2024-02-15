const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;
    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

// Add interval to change image every 2 seconds
setInterval(() => {
  const nextButton = document.querySelector("[data-carousel-button='next']");
  nextButton.click();
}, 3000);

// Get the input field
let input = document.querySelector('input[name="search"]');

// Listen for keystrokes
input.addEventListener("keyup", filterCards);

function filterCards() {
  // Get the search term (in lower case)
  let searchTerm = input.value.toLowerCase();

  // Get all the cards
  let cards = document.querySelectorAll(".card");

  // Loop through the cards
  cards.forEach(function (card) {
    // Get the title of the card
    let title = card.querySelector(".card-title").textContent.toLowerCase();
    // Get the subtitle of the card
    let subtitle = card
      .querySelector(".card-subtitle")
      .textContent.toLowerCase();
    // Get the text content of the card
    let textContent = card
      .querySelector(".card-text")
      .textContent.toLowerCase();

    // If the title, subtitle, or text content includes the search term, show the card, otherwise hide it
    if (
      title.includes(searchTerm) ||
      subtitle.includes(searchTerm) ||
      textContent.includes(searchTerm)
    ) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}
