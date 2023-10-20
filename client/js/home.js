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
        const userGreeting = document.querySelector(".greetingUser");

        if (userGreeting) {
          const greeting = document.createElement("h1");
          greeting.textContent = `Welcome ${data.userName}!`;
          greeting.style.textAlign = "center";
          userGreeting.appendChild(greeting);

          loadingScreen.style.display = "none";
        } else {
          console.log("Element with class 'greetingUser' not found.");
        }
      } else {
        // Redirect to the login page if no user is logged in
        window.location.href = "https://www.ahmed-yehia.me/html/login.html";
      }
    } catch (error) {
      console.error("Fetch error:", error);
      window.location.href = "https://www.ahmed-yehia.me/html/login.html";
    }
  };

  // Call the getCurrentUser function to check if the user is logged in
  getCurrentUser();
});