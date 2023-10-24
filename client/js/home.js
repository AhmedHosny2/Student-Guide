if (localStorage.getItem("userName") == null)
window.location.href = "https://www.ahmed-yehia.me/html/login.html";
else {
const loginButton = document.querySelectorAll(".login");
const avatar = document.querySelector(".avatar");
loginButton.forEach((button) => {
  button.style.display = "none";
});
avatar.classList.add("show");
}
// // start sout animation
const arrOfGreetings = [
  "Hello World!",
  "¡Hola Mundo!",
  "Hallo Welt!",
  "Ciao Mondo!",
  "!مرحبا بالعالم",
];

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

