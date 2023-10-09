document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const protectedRouteButton = document.getElementById("protected-route-button");
  const adminRouteButton = document.getElementById("admin-route-button");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    const apiUrl = "http://localhost:5001/user/login"; // Replace with your API URL

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formDataObject),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from the API:", data);
        // Handle the response data from the API (e.g., show a success message)
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });

  protectedRouteButton.addEventListener("click", () => {
    const protectedApiUrl = "http://localhost:5001/user/protected-route"; // Replace with your protected API URL

    fetch(protectedApiUrl, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        console.log("Response from Protected API Route:", data);
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });

  adminRouteButton.addEventListener("click", () => {
    const adminApiUrl = "http://localhost:5001/user/admin-route"; // Replace with your admin API URL

    fetch(adminApiUrl, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        console.log("Response from Admin API Route:", data);
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });
  document.getElementById("google-login-button").addEventListener("click", function() {
    window.location.href = "http://localhost:5001/auth/google";
});


});
