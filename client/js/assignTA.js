let taEmails = [];
import { taURL } from "../utils/env.js";
fetch(taURL + "/getTAs", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    taEmails = data.map((ta) => ta.email);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
// filter by email

const emailInput = document.getElementById("email");
// Event listener for input changes
emailInput.addEventListener("input", function () {
  const inputValue = emailInput.value.toLowerCase();
  const matchingEmails = taEmails.filter((email) =>
    email.toLowerCase().includes(inputValue)
  );

  displayAutocomplete(matchingEmails.slice(0, 5));
});

emailInput.addEventListener("blur", () => {
  const autoComp = document.querySelector(
    ".taCreation .container form .box #autocomplete-container"
  );
  // If there is an active element within the autocomplete container, do nothing and keep it open
  // Otherwise, close the autocomplete box when the mouse leaves the field
  setTimeout(() => {
    autoComp.classList.add("inactive");
  }, 200); // Adjust the delay time as needed
});

emailInput.addEventListener("focus", () => {
  const autoComp = document.querySelector(
    ".taCreation .container form .box #autocomplete-container"
  );
  autoComp.classList.remove("inactive");
});

// Function to display autocomplete suggestions
function displayAutocomplete(suggestions) {
  const autocompleteContainer = document.getElementById(
    "autocomplete-container"
  );

  // Clear previous suggestions
  while (autocompleteContainer.firstChild) {
    autocompleteContainer.removeChild(autocompleteContainer.firstChild);
  }

  // Display new suggestions
  suggestions.forEach((suggestion) => {
    const suggestionElement = document.createElement("div");
    suggestionElement.classList.add("suggestion");
    suggestionElement.textContent = suggestion;

    suggestionElement.addEventListener("click", function () {
      // Set selected suggestion to the input field
      emailInput.value = suggestion;
      // Clear the autocomplete suggestions
      autocompleteContainer.innerHTML = "";
    });

    autocompleteContainer.appendChild(suggestionElement);
  });
}

// old
const addBtn = document.getElementById("addTutorials");
const clearBtn = document.getElementById("clear");
const tutorialsVal = document.getElementById("tutorials-value");
const listOfTutorials = document.getElementById("listOfTutorials");
let arrOfTutorials = [];
if (addBtn)
  addBtn.onclick = (event) => {
    event.preventDefault();

    const tutorialValue = tutorialsVal.value;
    if (tutorialValue.trim() !== "") {
      arrOfTutorials.push(tutorialValue);
      //create tutorial element in page
      const tutorial = document.createElement("div");
      tutorial.className = "tut";
      tutorial.innerHTML = tutorialValue;
      listOfTutorials.appendChild(tutorial);
      //create delete button to remove elements from page
      const delBtn = document.createElement("span");
      delBtn.textContent = "delete";
      delBtn.className = "del";
      tutorial.appendChild(delBtn);

      delBtn.addEventListener("click", () => {
        const index = arrOfTutorials.indexOf(tutorialValue);
        if (index > -1) {
          listOfTutorials.removeChild(tutorial);
          arrOfTutorials.splice(index, 1);
        }
      });
      //used to empty the value to text area each time adding element
      tutorialsVal.value = "";
    }
    //for testing
  };
if (clearBtn) {
  clearBtn.onclick = (event) => {
    event.preventDefault();
    // Remove all tutorials from the list and clear the array
    listOfTutorials.innerHTML = "";
    arrOfTutorials = [];
  };
}

// back end
const TAFrom = document.getElementById("TA-assign-form");
const officeHourInput = document.getElementById("officeHour");
const courseNameInput = document.getElementById("courseName");
TAFrom.addEventListener("submit", function (event) {
  event.preventDefault();

  const officeHours = officeHourInput.value;
  const email = emailInput.value;
  const tutorials = arrOfTutorials.sort((a, b) => a - b);
  const courseName = courseNameInput.value;
  try {
    fetch(taURL + "/assign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        tutorials,
        courseName,
        officeHours,
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
