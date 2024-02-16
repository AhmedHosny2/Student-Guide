// start sout animation
const arrOfGreetings = [
  "Hello World!",
  "¡Hola Mundo!",
  "Hallo Welt!",
  "Ciao Mondo!",
  "!مرحبا بالعالم",
];
import { showErrorAlert, showSuccessAlert } from "./alerts.js";
showSuccessAlert("Welcome to our website");
var successAlert = document.createElement("div");
successAlert.className = "success-alert";
successAlert.innerHTML = "<strong>Success:</strong> " + "message";
document.body.appendChild(successAlert);
// document.body.removeChild(successAlert);

const greeting = document.getElementById("greeting");
const h1 = document.createElement("h1");
h1.innerHTML = "welcome";
greeting.appendChild(h1);

let currentIndex = 0;

setInterval(() => {
  h1.style.opacity = 0; // Set opacity to 0 to fade out
  setTimeout(() => {
    h1.innerHTML = arrOfGreetings[currentIndex];
    h1.style.opacity = 1; // Set opacity to 1 to fade in
    currentIndex = (currentIndex + 1) % arrOfGreetings.length;
  }, 1000);
}, 2000);

//start animation
const sectionPoints = document.querySelectorAll(
  ".section-global .section-points li"
);
const observerOfSectionPoints = new IntersectionObserver(
  (entries) => {
    entries.forEach((el) => {
      if (el.isIntersecting) el.target.classList.add("active");
    });
  },
  { threshold: 1 }
);
sectionPoints.forEach((el) => observerOfSectionPoints.observe(el));

const welcomeText = document.querySelectorAll(".welcome .container .text h1");
const soutText = document.querySelectorAll(".welcome .container .sout");
const logo = document.querySelectorAll(".welcome .container .img img");
const observerOfWelcome = new IntersectionObserver(
  (entries) => {
    entries.forEach((el) => {
      if (el.isIntersecting) el.target.classList.add("active");
    });
  },
  { threshold: 1 }
);

welcomeText.forEach((el) => observerOfWelcome.observe(el));
soutText.forEach((el) => observerOfWelcome.observe(el));
logo.forEach((el) => observerOfWelcome.observe(el));
