//nav bar responsive
const hamburgerMenu = document.querySelector(".burger-menu");
const navBar = document.querySelector(".header .nav");

hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("active");
  navBar.classList.toggle("active");
});


