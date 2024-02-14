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
//logout
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/client/html/login.html";
});
import { clientLoginURL } from "../utils/env.js";
// to hide login button and replace it with avatar
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
