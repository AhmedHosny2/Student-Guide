import { clientLoginURL } from "../utils/env.js";
if (localStorage.getItem("userName") == null)
  window.location.href = clientLoginURL;
else {
  const avatar = document.querySelector(".avatar i");
  avatar.classList.add("show");
  const loginButton = document.querySelectorAll(".login");
  loginButton.forEach((button) => {
    button.style.display = "none";
  });
}

let taEmails = [];
import { taURL } from "../utils/env.js";
fetch(taURL, {
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
    console.log("Response from the API:", taEmails);
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

  displayAutocomplete(matchingEmails);
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
if(addBtn)
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
  console.log(arrOfTutorials);
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
const taNameInput = document.getElementById("taName");
const officeHourInput = document.getElementById("officeHour");
const officeLocationInput = document.getElementById("officeLocation");
const courseNameInput = document.getElementById("courseName");
TAFrom.addEventListener("submit", function (event) {
  event.preventDefault();

  const officeHours = officeHourInput.value;
  const email = emailInput.value;
  const tutorials = arrOfTutorials.sort();
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
        console.log(response);
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
