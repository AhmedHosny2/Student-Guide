import { taURL } from "../utils/env.js";
import { tost } from "./Toastify.js";
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
          tost("Something went wrong please infrom the Admin!", "error", 3000);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        tost("TA added successfully!", "success", 3000);
        console.log("Response from the API:", data);
        TAFrom.reset();
        // Handle the response data from the API (e.g., show a success message)
      })
      .catch((error) => {
        tost("Something went wrong please infrom the Admin!", "error", 3000);
        console.error("Fetch error:", error);
      });
  } catch (err) {
    console.error(err);
  }
});
