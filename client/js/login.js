
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject);
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
        console.log(response);
        if (response.status !==200) {
          throw new Error("Network response was not ok");
        }
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
          const [name, value] = cookie.trim().split('=');
          if (name === 'myCookie') {
            const data = JSON.parse(decodeURIComponent(value));
            console.log("the cookie " + data); // This will log the data from the cookie
            break;
          }
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
});
