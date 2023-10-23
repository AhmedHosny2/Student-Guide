//nav bar responsive
const hamburgerMenu = document.querySelector(".burger-menu");
const navBar = document.querySelector(".header .nav");
if (localStorage.getItem("userName") == null)
window.location.href = "https://www.ahmed-yehia.me/html/login.html";
else {
const loginButton = document.querySelectorAll(".login");
loginButton.forEach((button) => {
  button.style.display = "none";
});
}
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

