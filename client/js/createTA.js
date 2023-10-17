const addBtn = document.getElementById("addTutorials");
const clearBtn = document.getElementById("clear");
const tutorialsVal = document.getElementById("tutorials-value");

let arrOfTutorials = [];

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

// Get references to the form and input elements
const courseForm = document.getElementById("TA-form");
const taNameInput = document.getElementById("taName");
const officeHourInput = document.getElementById("officeHour");
const officeLocationInput = document.getElementById("officeLocation");
const emailInput = document.getElementById("email");
const courseNameInput = document.getElementById("courseName");
courseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = taNameInput.value;
  const officeHours = officeHourInput.value;
  const officeLocation = officeLocationInput.value;
  const email = emailInput.value;
  const tutorials = arrOfTutorials.sort();
  const course = courseNameInput.value;
  try {
    const apiUrl = `http://localhost:5003/TADirectory`; // Replace with your API URL here
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        officeHours,
        officeLocation,
        course,
        tutorials,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          failAlert("TA was Added before", 3000);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        sucAlert("TA added successfully!", 3000);
        console.log("Response from the API:", data);
        // Handle the response data from the API (e.g., show a success message)
      })
      .catch((error) => {
        failAlert("Something went wrong please infrom the Admin!", 3000);

        console.error("Fetch error:", error);
      });
  } catch (err) {
    console.error(err);
  }

  courseForm.reset();
  arrOfTutorials.length = 0;
  listOfTutorials.innerHTML = "";
});

//alerts
function sucAlert(message, duration) {
  const alertDiv = document.createElement("div");
  alertDiv.textContent = message;
  alertDiv.style.position = "fixed";
  alertDiv.style.top = "10px";
  alertDiv.style.left = "50%";
  alertDiv.style.transform = "translateX(-50%)";
  alertDiv.style.backgroundColor = "lightgreen"; // Green background
  alertDiv.style.color = "green"; // Green text color
  alertDiv.style.padding = "10px";
  alertDiv.style.border = "1px solid #008000"; // Green border
  alertDiv.style.borderRadius = "5px";
  alertDiv.style.textAlign = "center";
  alertDiv.style.opacity = 0;
  alertDiv.style.transition = "opacity 0.5s ease-in-out";

  document.body.appendChild(alertDiv);

  setTimeout(function () {
    alertDiv.style.opacity = 1;
  }, 10); // Delay for a smooth appearance

  setTimeout(function () {
    alertDiv.style.opacity = 0;
    setTimeout(function () {
      document.body.removeChild(alertDiv);
    }, 500); // Remove the alert after the fade-out animation
  }, duration);
}

function failAlert(message, duration) {
  const alertDiv = document.createElement("div");
  alertDiv.textContent = message;
  alertDiv.style.position = "fixed";
  alertDiv.style.top = "10px";
  alertDiv.style.left = "50%";
  alertDiv.style.transform = "translateX(-50%)";
  alertDiv.style.backgroundColor = "lightcoral"; // Red background
  alertDiv.style.color = "red"; // Red text color
  alertDiv.style.padding = "10px";
  alertDiv.style.border = "1px solid #FF0000"; // Red border
  alertDiv.style.borderRadius = "5px";
  alertDiv.style.textAlign = "center";
  alertDiv.style.opacity = 0;
  alertDiv.style.transition = "opacity 0.5s ease-in-out";

  document.body.appendChild(alertDiv);

  setTimeout(function () {
    alertDiv.style.opacity = 1;
  }, 10); // Delay for a smooth appearance

  setTimeout(function () {
    alertDiv.style.opacity = 0;
    setTimeout(function () {
      document.body.removeChild(alertDiv);
    }, 500); // Remove the alert after the fade-out animation
  }, duration);
}
