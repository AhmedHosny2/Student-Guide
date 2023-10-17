//start tutorials local storage
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

// Get references to the form element
// Get references to the form and input elements
const courseForm = document.getElementById("TA-form");
const taNameInput = document.getElementById("taName");
const officeHourInput = document.getElementById("officeHour");
const officeLocationInput = document.getElementById("officeLocation");
const emailInput = document.getElementById("email");

// Event handler for the form submission
courseForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Retrieve the values from the input fields
  const taName = taNameInput.value;
  const officeHour = officeHourInput.value;
  const officeLocation = officeLocationInput.value;
  const email = emailInput.value;
  const tutorials = arrOfTutorials.sort();

  // Print the retrieved values to the console
  console.log("TA Name: " + taName);
  console.log("Office Hour: " + officeHour);
  console.log("Office Location: " + officeLocation);
  console.log("Email: " + email);
  console.log("Tutorials: " + tutorials);

  // You can perform further actions with the retrieved values here

  // Reset the form after submission if needed
  courseForm.reset();
  arrOfTutorials.length = 0;
  listOfTutorials.innerHTML = "";
});
