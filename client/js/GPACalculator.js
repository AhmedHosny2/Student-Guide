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

  const gradesArray = new Array(subjects.length).fill(0);

  // Create choice buttons for each subject
  let curSemester = 0;
  let currentSemesterDiv; // To keep track of the current semester div
  subjects.forEach((subject) => {
    if (curSemester !== subject.semester) {
      curSemester = subject.semester;

      // Create a new div for each semester
      const semesterDiv = document.createElement("div");
      semesterDiv.classList.add("sem");
      const semesterHeader = document.createElement("h4");
      semesterHeader.textContent = `Semester ${subject.semester}`;
      semesterDiv.appendChild(semesterHeader);

      // Update the currentSemesterDiv
      currentSemesterDiv = semesterDiv;

      // Add the div to the subjectButtonsContainer
      subjectButtonsContainer.appendChild(semesterDiv);

      // Create a checkbox to select all subjects of this semester
      const selectAllWrap = document.createElement("div");
      selectAllWrap.classList.add("selectAllWrap");

      const checkBoxWrapAll = document.createElement("div");
      checkBoxWrapAll.classList.add("checkbox-wrapper");

      const label = document.createElement("label");
      label.setAttribute("for", `semester-${subject.semester}`);
      const tickMarkAll = document.createElement("div");
      tickMarkAll.classList.add("tickMark");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = `semester-${subject.semester}`;
      input.id = `semester-${subject.semester}`;
      input.value = subject.creditHours;
      const pContent = document.createElement("p");
      pContent.textContent = `Select All Semester ${subject.semester}`;
      checkBoxWrapAll.appendChild(input);
      checkBoxWrapAll.appendChild(label);
      selectAllWrap.appendChild(checkBoxWrapAll);
      selectAllWrap.appendChild(pContent);
      currentSemesterDiv.appendChild(selectAllWrap);
    }

    // Create a div to wrap each input and label
    const choiceWrapDiv = document.createElement("div");
    choiceWrapDiv.classList.add("choiceWrap");
    //create checkbox wrap
    const checkboxWrap = document.createElement("div");
    checkboxWrap.classList.add("checkbox-wrapper");

    const labelCheckBox = document.createElement("label");
    const tickMark = document.createElement("div");
    tickMark.classList.add("tickMark");

    const checkboxSubject = document.createElement("input");
    checkboxSubject.type = "checkbox";
    checkboxSubject.name = subject.name + "-" + subject.semester;
    checkboxSubject.id = subject.semester + subject.name;
    checkboxSubject.value = subject.creditHours;

    //apend the checkbox, label and tickmark inside the checkboxWrap
    checkboxWrap.appendChild(checkboxSubject);
    checkboxWrap.appendChild(labelCheckBox);
    labelCheckBox.appendChild(tickMark);

    // Set the 'for' attribute of the label to match the checkbox 'id'
    labelCheckBox.setAttribute("for", subject.semester + subject.name);

    const pSubject = document.createElement("p");
    pSubject.textContent = `${subject.name} (${subject.creditHours} credit hours)`;
    const gradeSelect = document.createElement("select");
    gradeSelect.name = `${subject.name}-grade`;

    for (const grade in grades) {
      const option = document.createElement("option");
      option.value = grade;
      option.textContent = grade;
      gradeSelect.appendChild(option);
    }

    // Append input, label, and gradeSelect to the choiceWrapDiv
    choiceWrapDiv.appendChild(checkboxWrap);
    choiceWrapDiv.appendChild(pSubject);
    choiceWrapDiv.appendChild(gradeSelect);

    // Hide grade option by default
    gradeSelect.style.display = "none";
    checkboxSubject.addEventListener("change", function () {
      // Make grade option visible when checkbox is checked
      if (checkboxSubject.checked) {
        gradeSelect.style.display = "block";
      }
      // Hide grade option when checkbox is unchecked
      else {
        gradeSelect.style.display = "none";
      }
    });

    gradeSelect.addEventListener("change", function () {

      let gradeValue;
      let selectedGrade;
      if (checkboxSubject.checked) {
        selectedGrade = gradeSelect.value;
        gradeValue = grades[selectedGrade];
        gradesArray[subject.id - 1] = gradeValue; // Update grade in gradesArray
      }
      console.log(gradeValue, selectedGrade);
    });
    // Append the choiceWrapDiv to the currentSemesterDiv
    currentSemesterDiv.appendChild(choiceWrapDiv);
  });


  // Select buttons that id starts with semester
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
      // Select all options that id start with semester number
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

    // Use reduce to get totalCreditHoursWithGrades
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