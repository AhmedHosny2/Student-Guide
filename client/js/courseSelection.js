// Define the courses for each semester
const courses = {
    1: ["Math 1", "Physics", "Techn", "CS 1"],
    2: ["Math 2", "OOP", "Network", "Micro", "Theo"],
    3: ["CPP", "OS", "DSA", "DB", "Math 3"],
    4: ["SE", "DS", "IT", "DIS", "Media", "Math 4"]
};

// Get the select element
const semesterSelect = document.getElementById("semester");
const courseList = document.getElementById("course-list");

// Function to display courses for the selected semester
function displayCourses() {
    const selectedSemester = semesterSelect.value;
    const selectedCourses = courses[selectedSemester];

    // Clear the existing course list
    courseList.innerHTML = "";

    // Display the courses for the selected semester as buttons
    if (selectedCourses) {
        selectedCourses.forEach(course => {
            const button = document.createElement("button");
            button.className = "course-button";
            button.textContent = course;
            courseList.appendChild(button);
        });
    } else {
        courseList.textContent = "No courses available for this semester.";
    }
}

// Initially display courses for the selected semester
displayCourses();

// Add an event listener to update the course list when the user selects a different semester
semesterSelect.addEventListener("change", displayCourses);
