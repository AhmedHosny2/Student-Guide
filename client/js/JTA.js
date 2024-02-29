const semesterDropdown = document.getElementById("semester");
const courseDropdown = document.getElementById("course");

const courses = {
  2: ["Math2 ", "OOP", "Network", "Computer Organisation", "Theoretical"],
  4: ["SE", "DS", "IT", "Distributed", "Media", "Math 4"],
};

semesterDropdown.addEventListener("change", (event) => {
  const selectedSemester = event.target.value;
  const semesterCourses = courses[selectedSemester];

  while (courseDropdown.firstChild) {
    courseDropdown.removeChild(courseDropdown.firstChild);
  }

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Select a course";
  defaultOption.selected = true;
  defaultOption.disabled = true;
  courseDropdown.appendChild(defaultOption);

  semesterCourses.forEach((course) => {
    const option = document.createElement("option");
    option.value = course;
    option.text = course;
    courseDropdown.appendChild(option);
  });
});
