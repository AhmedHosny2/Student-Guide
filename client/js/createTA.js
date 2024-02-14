import { taURL } from "../utils/env.js";

// Get references to the form and input elements
const TAFrom = document.getElementById("TA-form");
const taNameInput = document.getElementById("taName");
const officeLocationInput = document.getElementById("officeLocation");
const emailInput = document.getElementById("email");
const genderSelect = document.getElementById("gender");

TAFrom.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = taNameInput.value;
  const officeLocation = officeLocationInput.value;
  const email = emailInput.value;
  const gender = genderSelect.value;
  try {
    fetch(taURL + "/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        officeLocation,
        gender,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          alert("1 Something went wrong please infrom the Admin!", 3000);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        alert("TA added successfully!", 3000);
        console.log("Response from the API:", data);
        TAFrom.reset();
        // Handle the response data from the API (e.g., show a success message)
      })
      .catch((error) => {
        alert("Something went wrong please infrom the Admin!", 3000);

        console.error("Fetch error:", error);
      });
  } catch (err) {
    console.error(err);
  }
});
