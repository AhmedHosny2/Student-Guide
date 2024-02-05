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

document.addEventListener("DOMContentLoaded", function () {
  loadAllSubjects();
  loadSelectedSubjects();
});

function loadAllSubjects() {
  const allSubjectsForm = document.getElementById("allSubjectsForm");

  Object.keys(subjects).forEach((semester) => {
    subjects[semester].forEach((subject) => {
      const checkbox = createCheckbox(subject.name, subject.creditHours);
      allSubjectsForm.appendChild(checkbox.label);
    });
  });
}

function loadSelectedSubjects() {
  const selectedSemesterElement = document.getElementById("selectedSemester");
  const subjectForm = document.getElementById("subjectForm");

  const checkboxes = document.querySelectorAll(
    `#allSubjectsForm input[type="checkbox"]`
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      loadSubjects();
    });
  });

  selectedSemesterElement.innerText = "Selected Subjects:";
  subjectForm.innerHTML = "";
}

function createCheckbox(name, creditHours) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = name;
  checkbox.value = creditHours;

  const label = document.createElement("label");
  label.appendChild(checkbox);
  label.appendChild(
    document.createTextNode(`${name} - ${creditHours} credit hours`)
  );

  return { checkbox, label };
}

function selectAllSubjects(semester) {
  const checkboxes = document.querySelectorAll(
    `#allSubjectsForm input[type="checkbox"]`
  );

  subjects[semester].forEach((subject) => {
    const checkbox = document.querySelector(
      `#allSubjectsForm input[name="${subject.name}"]`
    );
    if (checkbox) {
      checkbox.checked = true;
    }
  });

  loadSubjects();
}
let totalCreditHours = 0;
function showSelectedSubjects() {
  const selectedSubjects = document.getElementById("selectedSubjects");
  const checkboxes = document.querySelectorAll(
    `#allSubjectsForm input[type="checkbox"]:checked`
  );

  selectedSubjects.innerHTML = "";

  checkboxes.forEach((checkbox) => {
    const listItem = document.createElement("li");
    listItem.textContent = checkbox.name;

    const gradeDropdown = createGradeDropdown(checkbox.name);
    listItem.appendChild(gradeDropdown);

    selectedSubjects.appendChild(listItem);

    totalCreditHours += parseInt(checkbox.value);
  });
  // create button to calc the gpa
  const calcButton = document.createElement("button");
  calcButton.textContent = "Calculate GPA";
  calcButton.onclick = function () {
    calculateGPA();
  };
  selectedSubjects.appendChild(calcButton);
  alert(`Total Credit Hours: ${totalCreditHours}`);
}
const calculateGPA = () => {
  // get all leters
  // then for each letter get the value from grades object
  // then get the credit hours from subject object
  // then multiply the two values and sum them
  // at the end divide the sum by the total credit hours
  const selectedSubjects = document.getElementById("selectedSubjects");
  const selectedSubjectsList = selectedSubjects.querySelectorAll("li");
  let sum = 0;
  let totalCreditHours = 0;
  selectedSubjectsList.forEach((subject) => {
    const grade = subject.querySelector("select").value;
    console.log(grade+"\n");
    const creditHours = parseInt(
      getCreditHours(subject.textContent.split("A+")[0])
    );
    totalCreditHours += creditHours;
    sum += grade * creditHours;
  });
  const gpa = sum / totalCreditHours;
  alert(`Your GPA is: ${gpa.toFixed(2)}`);
};

function createGradeDropdown(subjectName) {
  const dropdown = document.createElement("select");
  dropdown.name = `${subjectName}-grade`;

  for (const grade in grades) {
    const option = document.createElement("option");
    option.value = grades[grade];
    option.text = grade;
    dropdown.add(option);
  }

  return dropdown;
}

function getCreditHours(subjectName) {
  for (const semester in subjects) {
    const subject = subjects[semester].find((sub) => sub.name === subjectName);
    if (subject) {
      return subject.creditHours;
    }
  }
  return 0; // Return 0 if subject not found
}
