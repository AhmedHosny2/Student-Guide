document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("course-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const formDataObject = {};

    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const apiUrl = `http://localhost:5002/course`; // Replace with your API URL
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject),
        credentials: "include",
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

    } catch (err) {
      console.error(err);
    }
  });
});
