import { tost } from "./Toastify.js";
window.onload = function () {
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
  nameInput.placeholder = "Name ex midterm";
  divElement.appendChild(nameInput);

  // Create input element for Weight
  const weightInput = document.createElement("input");
  weightInput.type = "text";
  weightInput.className = "weightInput";
  weightInput.placeholder = "Weight ex 30%";
  divElement.appendChild(weightInput);

  // Create input element for Exam Grade
  const examInput = document.createElement("input");
  examInput.type = "text";
  examInput.className = "examInput";
  examInput.placeholder = "Exam Grade ex 100";
  divElement.appendChild(examInput);

  // Create input element for Your Grade
  const gradeInput = document.createElement("input");
  gradeInput.type = "text";
  gradeInput.className = "gradeInput";
  gradeInput.placeholder = "Your Grade ex 88";
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
  const toPass = Math.max(0.5 - totalWeightedGrade, 0);
  if (toPass == 0)
    tost(
      `Your total weighted grade is: ${
        totalWeightedGrade.toFixed(4) * 100
      }%  you have passed`,
      "success",
      6000
    );
  else
    tost(
      `Your total  grade is: ${
        totalWeightedGrade.toFixed(4) * 100
      }%  you need ${toPass.toFixed(3) * 100}% to pass`,
      "info",
      6000
    );
});
// Assuming "whatif" is not an input field
document.getElementById("whatif").addEventListener("mouseover", function() {
  this.textContent = "What if Afelt el final?";
});

document.getElementById("whatif").addEventListener("mouseout", function() {
  this.textContent = "whatif??!"; // Resetting text content, you might want to set it to some other default value if needed
});

const whatif = document.getElementById("whatif");
whatif.addEventListener("click", function () {
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

  nameInput.value= "Final";
  divElement.appendChild(nameInput);
  // get total weight graded he already have
  let totalWeightedGrade = 0;

  // Loop through each set of input fields
  gradesContainer.querySelectorAll("div").forEach(function (gradeDiv) {
    const weightInput = gradeDiv.querySelector(".weightInput");
    let weightNUm = weightInput.value.includes("%")
      ? weightInput.value.slice(0, -1)
      : weightInput.value.includes("0.")
      ? weightInput.value * 100
      : weightInput.value;
    const weight = parseFloat(weightNUm) / 100; // converting percentage to decimal
    totalWeightedGrade += weight;

  });
  // Create input element for Weight
  const weightInput = document.createElement("input");
  weightInput.type = "text";
  weightInput.className = "weightInput";
  weightInput.placeholder = "Weight";
  weightInput.value = (1 - totalWeightedGrade)*100 + "%";
  divElement.appendChild(weightInput);

  // Create input element for Exam Grade
  const examInput = document.createElement("input");
  examInput.type = "text";
  examInput.className = "examInput";
  examInput.placeholder = "Exam Grade";
  examInput.value = "100";
  divElement.appendChild(examInput);

  // Create input element for Your Grade
  const gradeInput = document.createElement("input");
  gradeInput.type = "text";
  gradeInput.className = "gradeInput";
  gradeInput.placeholder = "Your Grade";
  gradeInput.value = "100";
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
  calculateButton.click();
});
