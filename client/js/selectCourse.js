import { getCourseURL, coursesURL, clientLoginURL } from "../utils/env.js";
const courses = {
  1: ["Math 1", "Physics", "Technical Foundation", "CS1"],
  2: ["Math2 ", "OOP", "Network", "Micro Computer", "Theoretical"],
  3: ["CPP", "OS", "DSA", "DB", "Math 3"],
  4: ["SE", "DS", "IT", "Distributed", "Media", "Math 4"],
};

const courseImages = ["../images/courses (1).svg",
  "../images/courses (2).svg",
  "../images/courses (3).svg",
  "../images/courses (4).svg"]

const semesterSelect = document.getElementById("semester");
const courseList = document.getElementById("course-list");
if (localStorage.getItem("userName") == null)
  window.location.href = clientLoginURL;
else {
  const avatar = document.querySelector(".avatar i");
  avatar.classList.add("show");
  const loginButton = document.querySelectorAll(".login");
  loginButton.forEach((button) => {
    button.style.display = "none";
  });
}
function displayCourses() {
  const selectedSemester = semesterSelect.value;
  const selectedCourses = courses[selectedSemester];

  courseList.innerHTML = "";

  if (selectedCourses) {
    selectedCourses.forEach((course, index) => {

      //create course card
      const courseCard = document.createElement("div");
      courseCard.className = "course-card";

      //create course paragraph
      const courseName = document.createElement("p");
      courseName.textContent = course;
      courseCard.appendChild(courseName);

      //add card images
      const cardImg = document.createElement("img");
      cardImg.src = courseImages[index % courseImages.length];
      courseCard.appendChild(cardImg);

      courseCard.addEventListener("click", async function () {
        try {
          const apiUrl = `${coursesURL}/${course}`;
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
              localStorage.setItem("readingTime", Math.floor(data.content.length / 200));
              window.location.href = getCourseURL;

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

semesterSelect.addEventListener("change", displayCourses);
displayCourses();

//remove admin button
const addCourseButton = document.querySelector(".re-direct");
if (localStorage.getItem("isAdmin") === "false" || localStorage.getItem("isAdmin") == null) {
  addCourseButton.style.display = "none";
}
