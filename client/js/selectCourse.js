// Define the courses for each semester
const courses = {
  1: ["Math1", "Physics", "Techn", "CS1"],
  2: ["Math2", "OOP", "Network", "Micro", "Theo"],
  3: ["CPP", "OS", "DSA", "DB", "Math3"],
  4: ["SE", "DS", "IT", "DIS", "Media", "Math4"],
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
  // Display the courses for the selected semester as div
  if (selectedCourses) {
    selectedCourses.forEach((course) => {
      course = course.toLowerCase();
      //create a course card
      const courseCard = document.createElement("div");
      courseCard.className = "course-card";

      //create course name paragraph
      const courseName = document.createElement("p");
      courseName.textContent = course;
      courseCard.appendChild(courseName);

      courseCard.addEventListener("click", async function () {
        try {
          // const apiUrl = `http://localhost:5002/course/${course}`; // Replace with your API URL here
          const apiUrl = `https://student-guide-course.ahmed-yehia.me/course/${course}`; // Replace with your API URL here
          fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              localStorage.setItem("courseData", data.content);
              localStorage.setItem("courseName", data.courseName);
              console.log("Response from the API:", data);
              //widow ref to this url https://www.ahmed-yehia.me/html/materials.html
              window.location.href =
                "https://www.ahmed-yehia.me/html/getCourse.html";
              // Handle the response data from the API (e.g., show a success message)
            })
            .catch((error) => {
              console.error("Fetch error:", error);
            });
        } catch (err) {
          console.error(err);
        }
      });
      courseList.appendChild(courseCard);
    });
  } else {
    courseList.textContent = "No courses available for this semester.";
  }
}
// Add an event listener to update the course list when the user selects a different semester
semesterSelect.addEventListener("change", displayCourses);
displayCourses();
