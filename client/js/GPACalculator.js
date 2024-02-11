document.addEventListener("DOMContentLoaded", function () {
  const subjects = [
    { id: 1, name: "Math", creditHours: 8, semester: 1 },
    { id: 2, name: "Physics", creditHours: 5, semester: 1 },
    { id: 3, name: "Technical", creditHours: 4, semester: 1 },
    { id: 4, name: "CS1", creditHours: 6, semester: 1 },
    { id: 5, name: "Math 2", creditHours: 4, semester: 2 },
    { id: 6, name: "CS 2", creditHours: 7, semester: 2 },
    { id: 7, name: "Networks", creditHours: 5, semester: 2 },
    { id: 8, name: "Theo", creditHours: 5, semester: 2 },
    { id: 9, name: "Micro", creditHours: 5, semester: 2 },
    { id: 10, name: "CS 3", creditHours: 7, semester: 3 },
    { id: 11, name: "OS", creditHours: 5, semester: 3 },
    { id: 12, name: "DB", creditHours: 6, semester: 3 },
    { id: 13, name: "DSA", creditHours: 6, semester: 3 },
    { id: 14, name: "Math 3", creditHours: 4, semester: 3 },
    { id: 15, name: "Math 4", creditHours: 4, semester: 4 },
    { id: 16, name: "Distributed", creditHours: 4, semester: 4 },
    { id: 17, name: "IT", creditHours: 4, semester: 4 },
    { id: 18, name: "DS", creditHours: 4, semester: 4 },
    { id: 19, name: "Media", creditHours: 4, semester: 4 },
    { id: 20, name: "SE", creditHours: 4, semester: 4 },
    { id: 23, name: "SE I", creditHours: 4, semester: 5 },

    { id: 21, name: "SDA", creditHours: 4, semester: 5 },
    { id: 22, name: "RE", creditHours: 4, semester: 5 },
    { id: 24, name: "SECT", creditHours: 4, semester: 5 },
    { id: 25, name: "SE sec", creditHours: 4, semester: 5 },
    { id: 26, name: "crypto", creditHours: 4, semester: 5 },
    { id: 27, name: "froensic", creditHours: 4, semester: 5 },
    { id: 28, name: "web prog.", creditHours: 4, semester: 5 },
    { id: 29, name: "HCI", creditHours: 4, semester: 5 },
    { id: 30, name: "graphics", creditHours: 4, semester: 5 },
    { id: 31, name: "ML I", creditHours: 4, semester: 5 },
    { id: 32, name: "DB prog", creditHours: 4, semester: 5 },
    { id: 33, name: "data vis.", creditHours: 4, semester: 5 },
    { id: 34, name: "PM", creditHours: 4, semester: 6 },
    { id: 35, name: "RM", creditHours: 4, semester: 6 },

    { id: 36, name: "Cloud", creditHours: 4, semester: 6 },
    { id: 37, name: "Mobile", creditHours: 4, semester: 6 },
    { id: 38, name: "SE II", creditHours: 4, semester: 6 },
    { id: 39, name: "NoSQL", creditHours: 4, semester: 6 },
    { id: 40, name: "ML II", creditHours: 4, semester: 6 },
    { id: 41, name: "Image", creditHours: 4, semester: 6 },

    { id: 42, name: "Network sec", creditHours: 4, semester: 6 },
    { id: 43, name: "Business Continuity", creditHours: 4, semester: 6 },
    { id: 44, name: "Ethical Hacking", creditHours: 4, semester: 6 },
    { id: 45, name: "3D Design", creditHours: 4, semester: 6 },
    { id: 46, name: "Usability ", creditHours: 4, semester: 6 },
    { id: 47, name: "Web Dev porj ", creditHours: 4, semester: 6 },
  ];

  const grades = {
    select: 0,
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

  const subjectForm = document.getElementById("subject-form");
  const subjectButtonsContainer = document.getElementById("subject-buttons");

  // Create choice buttons for each subject
  let curSemester = 0;
  let currentSemesterDiv; // To keep track of the current semester div
  subjects.forEach((subject, index) => {
    if (curSemester !== subject.semester) {
      curSemester = subject.semester;
      // Create a new div for each semester
      const semesterDiv = document.createElement("div");
      semesterDiv.classList.add("sem");
      const semesterHeader = document.createElement("h3");
      semesterHeader.textContent = `Semester ${subject.semester}`;
      semesterDiv.appendChild(semesterHeader);
      // Add the div to the subjectButtonsContainer
      subjectButtonsContainer.appendChild(semesterDiv);
      // Update the currentSemesterDiv
      currentSemesterDiv = semesterDiv;

      // Create a checkbox to select all subjects of this semester
      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = `semester-${subject.semester}`;
      input.id = `semester-${subject.semester}`;
      input.value = subject.creditHours;
      const label = document.createElement("label");
      label.textContent = `Select All Semester ${subject.semester}`;
      currentSemesterDiv.appendChild(input);
      currentSemesterDiv.appendChild(label);

    }

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = subject.name + "-" + subject.semester;
    input.id = subject.semester + subject.name;
    input.value = subject.creditHours;
    const label = document.createElement("label");
    label.textContent = `${subject.name} (${subject.creditHours} credit hours)`;
    const gradeSelect = document.createElement("select");
    gradeSelect.name = `${subject.name}-grade`;


    currentSemesterDiv.appendChild(input);
    currentSemesterDiv.appendChild(label);
    currentSemesterDiv.appendChild(gradeSelect);


    gradeSelect.style.display = "none";
    input.addEventListener("change", function () {
      if (input.checked) {
        gradeSelect.style.display = "block";
      } else {
        gradeSelect.style.display = "none";
      }
    });

    gradeSelect.addEventListener("change", function () {
      if (input.checked) {
        const selectedGrade = gradeSelect.value;
        const gradeValue = grades[selectedGrade];
        gradesArray[subject.id - 1] = gradeValue;
      }

      console.log(gradesArray);
    });
  });


  // select buttons that id starts with semester
  const selectButtons = document.querySelectorAll('input[id^="semester-"]');
  selectButtons.forEach((button) => {
    button.addEventListener("change", function () {
      const semester = button.name.split("-")[1];
      const subjectsOfSemester = subjects.filter(
        (subject) => subject.semester === parseInt(semester)
      );
      const creditHours = subjectsOfSemester.reduce(
        (acc, subject) => acc + subject.creditHours,
        0
      );
      //select all options that id start with semester number
      const gradeSelects = document.querySelectorAll(
        `input[id^="${semester}"]`
      );

      gradeSelects.forEach((gradeSelect) => {
        gradeSelect.click();
      });
    });
  });

  // Prevent form submission for demonstration purpose
  subjectForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let totalCreditHoursWithGrades = 0;
    let totalCreditHours = 0;

    // use reduce to get totalCreditHoursWithGrades
    for (let i = 0; i < gradesArray.length; i++) {
      if (gradesArray[i] === 0) {
        continue;
      }
      totalCreditHoursWithGrades += gradesArray[i] * subjects[i].creditHours;
      totalCreditHours += subjects[i].creditHours;
    }
    const result = totalCreditHoursWithGrades / totalCreditHours;
    alert(`GPA: ${result.toFixed(4)}`);
    console.log("Grades Array:", gradesArray);
  });
});
