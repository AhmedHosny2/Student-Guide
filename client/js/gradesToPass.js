window.onload = function() {
  const loadingScreen = document.getElementById("loader");
  loadingScreen.style.display = "none";
};
const addButton = document.getElementById("addButton");
const gradesContainer = document.getElementById("gradesContainer");
const calculateButton = document.getElementById("calculateButton");

addButton.addEventListener("click", function () {
  // Create div element
  const divElement = document.createElement("div");
  divElement.className = "subj";

  // Create paragraph element for subject label
  const subjectLabel = document.createElement("h4");
  subjectLabel.textContent = `subject`;
  divElement.appendChild(subjectLabel);

  // Create input element for Name
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.className = "nameInput";
  nameInput.placeholder = "Name";
  divElement.appendChild(nameInput);

  // Create input element for Weight
  const weightInput = document.createElement("input");
  weightInput.type = "text";
  weightInput.className = "weightInput";
  weightInput.placeholder = "Weight";
  divElement.appendChild(weightInput);

  // Create input element for Exam Grade
  const examInput = document.createElement("input");
  examInput.type = "text";
  examInput.className = "examInput";
  examInput.placeholder = "Exam Grade";
  divElement.appendChild(examInput);

  // Create input element for Your Grade
  const gradeInput = document.createElement("input");
  gradeInput.type = "text";
  gradeInput.className = "gradeInput";
  gradeInput.placeholder = "Your Grade";
  divElement.appendChild(gradeInput);

  // Create delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = '<i class=" fa-regular fa-trash-can"></i>';
  divElement.appendChild(deleteBtn);

  // Add event listener to delete button
  deleteBtn.addEventListener("click", function () {
    gradesContainer.removeChild(divElement);
  });

  // Append the div element to grades container
  gradesContainer.appendChild(divElement);
});
calculateButton.addEventListener("click", function () {
  let totalWeightedGrade = 0;

  // Loop through each set of input fields
  gradesContainer.querySelectorAll("div").forEach(function (gradeDiv) {
    const examGradeInput = gradeDiv.querySelector(".examInput");
    const yourGradeInput = gradeDiv.querySelector(".gradeInput");
    const weightInput = gradeDiv.querySelector(".weightInput");

    // Get values and convert to numbers
    const examGrade = parseFloat(examGradeInput.value);
    const yourGrade = parseFloat(yourGradeInput.value);
    let weightNUm = weightInput.value.includes("%")
      ? weightInput.value.slice(0, -1)
      : weightInput.value.includes("0.")
        ? weightInput.value * 100
        : weightInput.value;
    const weight = parseFloat(weightNUm) / 100; // converting percentage to decimal

    // Calculate weighted grade
    const weightedGrade = (yourGrade / examGrade) * weight;

    // Add to total
    totalWeightedGrade += weightedGrade;
  });
  const toPass = Math.max(.6 - totalWeightedGrade, 0);
  // Alert the result
  alert("Your total weighted grade is: " + totalWeightedGrade.toFixed(4) + `\n you need ${toPass.toFixed(3)} to pass`); // Round to 2 decimal places
});
