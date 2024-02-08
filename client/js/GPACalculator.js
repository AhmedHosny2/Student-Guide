// Subject details
const subjects = {
  1: [
    { name: "Math", creditHours: 8 },
    { name: "Physics", creditHours: 5 },
    { name: "Technical", creditHours: 4 },
    { name: "CS1", creditHours: 6 },
  ],
  2: [
    { name: "Math 2", creditHours: 4 },
    { name: "CS 2", creditHours: 7 },
    { name: "Networks", creditHours: 5 },
    { name: "Theo", creditHours: 5 },
    { name: "Micro", creditHours: 5 },
  ],
  3: [
    { name: "CS 3", creditHours: 7 },
    { name: "OS", creditHours: 5 },
    { name: "DB", creditHours: 6 },
    { name: "DSA", creditHours: 6 },
    { name: "Math 3", creditHours: 4 },
  ],
  4: [
    { name: "Math 4", creditHours: 4 },
    { name: "Distributed", creditHours: 4 },
    { name: "IT", creditHours: 4 },
    { name: "DS", creditHours: 4 },
    { name: "Media", creditHours: 4 },
    { name: "SE", creditHours: 4 },
  ],
};

const grades = {
  "A+": 0.7,
  A: 1,
  "A-": 1.3,
  "B+": 1.7,
  B: 2,
  "B-": 2.3,
  "C+": 2.7,
  C: 3,
  "C-": 3.3,
  "D+": 3.7,
  D: 4,
  "D-": 4.3,
  F: 5,
};

import { clientLoginURL } from "../utils/env.js";
if (localStorage.getItem("userName") == null)
  window.location.href = clientLoginURL;

  const subjectForm = document.getElementById("subject-form");
  const subjectButtonsContainer = document.getElementById("subject-buttons");

  // Create choice buttons for each subject
  for (const year in subjects) {
    const subjectsOfYear = subjects[year];
    const yearHeading = document.createElement("h2");
    yearHeading.textContent = `Year ${year}`;
    subjectButtonsContainer.appendChild(yearHeading);

    const selectAllButton = document.createElement("button");
    selectAllButton.textContent = "Select All";
    selectAllButton.addEventListener("click", function() {
      subjectsOfYear.forEach(subject => {
        const checkbox = subjectButtonsContainer.querySelector(`input[name="${subject.name}"]`);
        checkbox.checked = true;
      });
    });
    subjectButtonsContainer.appendChild(selectAllButton);

    subjectsOfYear.forEach(subject => {
      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = subject.name;
      input.value = subject.creditHours;
      const label = document.createElement("label");
      label.textContent = `${subject.name} (${subject.creditHours} credit hours)`;
      const br = document.createElement("br");
      subjectButtonsContainer.appendChild(input);
      subjectButtonsContainer.appendChild(label);
      subjectButtonsContainer.appendChild(br);
    });
  }

  // Prevent form submission for demonstration purpose
  subjectForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const selectedSubjects = [];
    const checkboxes = subjectForm.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
      selectedSubjects.push({
        name: checkbox.name,
        creditHours: parseInt(checkbox.value)
      });
    });
    console.log("Selected subjects:", selectedSubjects);
    // You can perform additional actions here based on the selected subjects
  });
