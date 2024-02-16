import { getCourseURL, coursesURL } from "../utils/env.js";
const courses = {
  1: ["Math 1", "Physics", "Technical Foundation", "CS1"],
  2: ["Math2 ", "OOP", "Network", "Micro Computer", "Theoretical"],
  3: ["CPP", "OS", "DSA", "DB", "Math 3"],
  4: ["SE", "DS", "IT", "Distributed", "Media", "Math 4"],
};

const courseImages = [
  "../images/courses (1).svg",
  "../images/courses (2).svg",
  "../images/courses (3).svg",
  "../images/courses (4).svg",
];

const semesterSelect = document.getElementById("semester");
const courseList = document.getElementById("course-list");

const pageData = document.getElementById("yaya");
pageData.style.display = "none";

const loader = document.getElementById("loader");
loader.style.display = "flex";

function displayCourses() {
  const selectedSemester = semesterSelect.value;
  const selectedCourses = courses[selectedSemester];

  courseList.innerHTML = "";
  if (selectedCourses) {
    selectedCourses.forEach((course, index) => {
      //create course card
      // loader.style.display = "none";
      pageData.style.display = "grid";
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
          const loaderDiv = document.getElementById("loaderDiv");
          loaderDiv.style.display = "block";
          pageData.style.display = "none";
          const apiUrl = `${coursesURL}/${course}`;
          console.log(apiUrl);
          fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          })
            .then((response) => {
              if (!response.ok) {
                loader.style.display = "none";
                pageData.style.display = "grid";
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              loaderDiv.style.display = "none";

              loader.style.display = "none";
              pageData.style.display = "grid";
              localStorage.setItem("courseData", data.content);
              localStorage.setItem("courseName", data.courseName);
              localStorage.setItem(
                "readingTime",
                Math.floor(data.content.length / 500)
              );
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
if (
  localStorage.getItem("isAdmin") === "false" ||
  localStorage.getItem("isAdmin") == null
) {
  addCourseButton.style.display = "none";
}
