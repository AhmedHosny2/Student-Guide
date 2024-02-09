document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("addButton");
  const gradesContainer = document.getElementById("gradesContainer");
  const calculateButton = document.getElementById("calculateButton");

  addButton.addEventListener("click", function () {
    // Create input fields with placeholders
    const inputFields = `
              <div>
                  <label>Name:</label>
                  <input type="text" class="nameInput" placeholder="e.g. midterm">
                  <label>Weight:</label>
                  <input type="text" class="weightInput" placeholder="e.g. 30%">
                  
                  <label>Exam Grade:</label>
                  <input type="text" class="examInput" placeholder="e.g. out of 100">
  
                  <label>Your Grade:</label>
                  <input type="text" class="gradeInput" placeholder="e.g. 85">
              </div>
          `;

    // Append input fields to grades container
    gradesContainer.insertAdjacentHTML("beforeend", inputFields);
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
    const toPass =Math.max( .6-totalWeightedGrade,0);
    // Alert the result
    alert("Your total weighted grade is: " + totalWeightedGrade.toFixed(4)+`\n you need ${toPass.toFixed(3)} to pass`); // Round to 2 decimal places
  });
});
