// if (localStorage.getItem("userName") == null)
// window.location.href = "https://www.ahmed-yehia.me/html/login.html";
// else {
// const loginButton = document.querySelectorAll(".login");
// loginButton.forEach((button) => {
//   button.style.display = "none";
// });
// }
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
//logout
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  localStorage.clear();
  // refersh 
  window.location.href = "http://127.0.0.1:5501/client/html/login.html"
  // TODO ===========================================================================
} 
);


