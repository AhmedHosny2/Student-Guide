//nav bar responsive
const hamburgerMenu = document.querySelector(".burger-menu");
const navBar = document.querySelector(".header .nav");

hamburgerMenu.addEventListener("click", () => {
  const vis = navBar.getAttribute("data-visibility");
  if (vis === "false") {
    navBar.setAttribute("data-visibility", "true");
    hamburgerMenu.classList.add("active");
  } else {
    navBar.setAttribute("data-visibility", "false");
    hamburgerMenu.classList.remove("active");
  }
});

