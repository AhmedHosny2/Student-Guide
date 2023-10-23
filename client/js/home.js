document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  // Function to get the current user and add their name to local storage
  const getCurrentUser = async () => {
    const apiUrl = "https://student-guide-users.ahmed-yehia.me/user"; //here
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (data.email) {
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userName", data.userName);
        localStorage.setItem("isAdmin", data.isAdmin);
        // Check if the user is logged in and display a message
        //create the user greeting

        const loginButton = document.querySelector(".login");
        loginButton.style.display = "none";
        loadingScreen.style.display = "none";
      } else {
        window.location.href = "https://www.ahmed-yehia.me/html/login.html";
      }
    } catch (error) {
      console.error("Fetch error:", error);
      window.location.href = "https://www.ahmed-yehia.me/html/login.html";
    }
  };


});
  getCurrentUser();
// start sout animation
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

// animate css transform
