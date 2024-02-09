import { getCourseURL, coursesURL, clientLoginURL } from "../utils/env.js";
const courses = {
  1: ["Math 1", "Physics", "Technical Foundation", "CS1"],
  2: ["Math2 ", "OOP", "Network", "Micro Computer", "Theoretical"],
  3: ["CPP", "OS", "DSA", "DB", "Math 3"],
  4: ["SE", "DS", "IT", "Distributed", "Media", "Math 4"],
};

// const courseImages = {
//   "math 1": "../images/math1.jpg",
//   physics: "../images/physics.jpg",
//   "technical foundation": "../images/technicalFoundation.jpg",
//   cs1: "../images/CS1.jpg",
//   "math2 ": "../images/math2.jpg",
//   oop: "../images/oop.jpg",
//   network: "../images/networks.jpg",
//   "micro computer": "../images/micro.jpg",
//   theoretical: "../images/theor.jpg",
//   cpp: "../images/cpp.png",
//   os: "../images/os.jpeg",
//   dsa: " ../images/dsa.png",
//   db: "../images/db.jpg",
//   "math 3": "  ../images/math3.jpg",
//   se: " ../images/SE.jpg",
//   ds: " ../images/ds.jpg",
//   it: " ../images/it.jpg",
//   distributed: " ../images/dis.jpg",
//   media: "  ../images/media.jpg",
//   "math 4": " ../images/math4.jpg",
// };

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
      // const courseNameLowerCase = course.toLowerCase();
      // const imageUrl = courseImages[courseNameLowerCase];

      // const courseCard = document.createElement("div");
      // courseCard.className = "course-card";
      // courseCard.style.backgroundImage = `url(${imageUrl})`;

      // create course name paragraph
      // const courseName = document.createElement("p");
      // courseName.textContent = course;
      // courseCard.appendChild(courseName);


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
