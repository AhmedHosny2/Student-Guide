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

  const gradesArray = new Array(subjects.length).fill(0);

  // Create choice buttons for each subject
  let curSemester = 0;
  subjects.forEach((subject, index) => {
    if (curSemester !== subject.semester) {
      curSemester = subject.semester;
      const br = document.createElement("br");
      subjectButtonsContainer.appendChild(br);
      const semesterHeader = document.createElement("h3");
      semesterHeader.textContent = `Semester ${subject.semester}`;
      subjectButtonsContainer.appendChild(semesterHeader);
      // creat button to select all subjects of this semester
      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = `semester-${subject.semester}`;
      input.id = `semester-${subject.semester}`;
      input.value = subject.creditHours;
      const label = document.createElement("label");
      label.textContent = `Select All Semester ${subject.semester}`;
      const br2 = document.createElement("br");
      subjectButtonsContainer.appendChild(input);
      subjectButtonsContainer.appendChild(label);
      subjectButtonsContainer.appendChild(br2);
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
    for (const grade in grades) {
      const option = document.createElement("option");
      option.value = grade;
      option.textContent = grade;
      gradeSelect.appendChild(option);
    }
    const br = document.createElement("br");
    subjectButtonsContainer.appendChild(input);
    subjectButtonsContainer.appendChild(label);
    subjectButtonsContainer.appendChild(gradeSelect);
    subjectButtonsContainer.appendChild(br);
    // hide grade option by default
    gradeSelect.style.display = "none";
    input.addEventListener("change", function () {
      // maKe grade option visible when checkbox is checked
      if (input.checked) {
        gradeSelect.style.display = "block";
      }
      // hide grade option when checkbox is unchecked
      else {
        gradeSelect.style.display = "none";
      }
    });

    gradeSelect.addEventListener("change", function () {
      if (input.checked) {
        const selectedGrade = gradeSelect.value;
        const gradeValue = grades[selectedGrade];
        gradesArray[subject.id - 1] = gradeValue; // Update grade in gradesArray
      }

      console.log(gradesArray);
    });
  });

  // get all select all semester buttons
  const semesterButtons = document.querySelectorAll('input[type="checkbox"]');
  semesterButtons.forEach((button) => {
    button.addEventListener("change", function () {
      const semester = button.name.split("-")[1];
      const subjectsInSemester = subjects.filter(
        (subject) => subject.semester === parseInt(semester)
      );
      if (button.checked) {
        subjectsInSemester.forEach((subject) => {
          const gradeSelect = document.getElementsByName(
            `${subject.name}-grade`
          )[0];
          gradeSelect.style.display = "block";
          gradesArray[subject.id - 1] = grades[gradeSelect.value];
        });
      } else {
        subjectsInSemester.forEach((subject) => {
          const gradeSelect = document.getElementsByName(
            `${subject.name}-grade`
          )[0];
          gradeSelect.style.display = "none";
          gradesArray[subject.id - 1] = 0;
        });
      }
      console.log(gradesArray);
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
    alert(`GPA: ${result.toFixed(2)}`);
    console.log("Grades Array:", gradesArray);
  });
});
