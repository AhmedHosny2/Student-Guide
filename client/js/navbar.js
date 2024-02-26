// Get the header element
const header = document.getElementById("header");

// Create container div
const containerDiv = document.createElement("div");
containerDiv.classList.add("container");

// Create logo
const logoDiv = document.createElement("div");
logoDiv.classList.add("logo");
const logoLink = document.createElement("a");

if ('/client/index.html' === location.pathname)
  logoLink.href = "index.html";
else
  logoLink.href = "../index.html";

const logoText = document.createElement("h4");
logoText.textContent = "resource ";
const spanElement = document.createElement("span");
spanElement.textContent = "hub";
logoText.appendChild(spanElement);
logoLink.appendChild(logoText);
logoDiv.appendChild(logoLink);
containerDiv.appendChild(logoDiv);

// Create navigation
const navDiv = document.createElement("nav");
navDiv.classList.add("nav");
navDiv.setAttribute("data-visibility", "false");

const ulElement = document.createElement("ul");
ulElement.classList.add("links");


//return the required links for each page
let navLinks;

if ('/client/index.html' === location.pathname) {
  navLinks = [
    { name: "location", link: "html/location.html" },
    { name: "TA directory", link: "html/TA-directory.html" },
    { name: "Courses", link: "html/selectCourse.html" },
    { name: "Schedules", link: "html/groupSchedule.html" },
    { name: "grade clac", link: "html/gradesToPass.html" },
    { name: "GPA calc", link: "html/GPACalculator.html" },
    { name: "Key Links", link: "html/resource gateway.html" },
    { name: "login", link: "html/login.html" },
  ];
} else {
  navLinks = [
    { name: "location", link: "../html/location.html" },
    { name: "TA directory", link: "../html/TA-directory.html" },
    { name: "Courses", link: "../html/selectCourse.html" },
    { name: "Schedules", link: "../html/groupSchedule.html" },
    { name: "grade clac", link: "../html/gradesToPass.html" },
    { name: "GPA calc", link: "../html/GPACalculator.html" },
    { name: "Key Links", link: "../html/resource gateway.html" },
    { name: "login", link: "../html/login.html" },
  ];
}
navLinks.forEach((item) => {
  const liElement = document.createElement("li");
  const aElement = document.createElement("a");
  aElement.href = item.link;
  aElement.textContent = item.name === "login" ? "logout" : item.name;
  liElement.appendChild(aElement);
  ulElement.appendChild(liElement);
});

navDiv.appendChild(ulElement);
containerDiv.appendChild(navDiv);

// Create avatar
const avatar = document.createElement("a");
if ('/client/index.html' === location.pathname)
  avatar.href = "html/profilePage.html";
else
  avatar.href = "../html/profilePage.html";
avatar.classList.add("avatar");
const iElement = document.createElement("i");
iElement.classList.add("fa-regular", "fa-user");
avatar.appendChild(iElement);
containerDiv.appendChild(avatar);

// Create logout link
const logoutLink = document.createElement("a");
logoutLink.href = ""; // Add the correct href for logout
logoutLink.id = "logout"; // Set the id for easy identification
logoutLink.classList.add("logout"); // Add the logout class
logoutLink.textContent = "logout";
containerDiv.appendChild(logoutLink);

// Create burger menu
const burgerMenuDiv = document.createElement("div");
burgerMenuDiv.classList.add("burger-menu");
const spanTop = document.createElement("span");
spanTop.classList.add("top");
const spanMid = document.createElement("span");
spanMid.classList.add("mid");
const spanBtm = document.createElement("span");
spanBtm.classList.add("btm");
burgerMenuDiv.appendChild(spanTop);
burgerMenuDiv.appendChild(spanMid);
burgerMenuDiv.appendChild(spanBtm);
containerDiv.appendChild(burgerMenuDiv);

// Create mobile navigation
const mobileNavDiv = document.createElement("div");
mobileNavDiv.classList.add("mobile-nav");

const mobileNavLinks = [
  { href: "../index.html", iconUnicode: "\u{f015}" },
  { href: "../html/location.html", iconUnicode: "\u{f3c5}" },
  { href: "../html/TA-directory.html", iconUnicode: "\u{f5fc}" },
  { href: "../html/selectCourse.html", iconUnicode: "\u{f5da}" },
];

mobileNavLinks.forEach((link) => {
  const aElement = document.createElement("a");
  aElement.href = link.href;
  if (link.active) {
    aElement.classList.add("active");
  }
  const iElement = document.createElement("i");
  iElement.classList.add("fa-solid");
  iElement.textContent = link.iconUnicode;
  aElement.appendChild(iElement);
  mobileNavDiv.appendChild(aElement);
});

containerDiv.appendChild(mobileNavDiv);

// Append the container to the header
header.appendChild(containerDiv);

// Hamburger menu functionality
let hamburgerMenu = document.querySelector(".burger-menu");
let navBar = document.querySelector(".nav");
hamburgerMenu.addEventListener("click", () => {
  let vis = navBar.getAttribute("data-visibility");
  if (vis === "false") {
    navBar.setAttribute("data-visibility", "true");
    hamburgerMenu.classList.add("active");
  } else {
    navBar.setAttribute("data-visibility", "false");
    hamburgerMenu.classList.remove("active");
  }
});

// Logout functionality
let logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/client/html/login.html";
});

// Avatar and login logic
import { clientLoginURL } from "../utils/env.js";
if (localStorage.getItem("userName") == null) {
  window.location.href = clientLoginURL;
} else {
  let avatar = document.querySelector(".avatar i");
  avatar.classList.add("show");
  logoutButton.style.display = "none";
}
