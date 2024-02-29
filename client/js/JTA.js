const semesterDropdown = document.getElementById("semester");
const courseDropdown = document.getElementById("course");
const dayDropdown = document.getElementById("dayDropdown");
const slotDropdown = document.getElementById("slot");

const courseLabel = document.getElementById("courseLabel");
const dayLabel = document.getElementById("dayLabel");
const slotLabel = document.getElementById("slotLabel");

courseLabel.style.display = "none";
dayLabel.style.display = "none";
slotLabel.style.display = "none";

const courses = {
  2: ["Math2 ", "OOP ", "Network ", "Computer Organisation ", "Theoretical "],
  4: ["SE ", "DS ", "IT ", "Distributed ", "Media ", "Math 4 "],
};
const slots = {
  1: ["First :8:30-10:00 "],
  2: ["Second :10:15-11:45 "],
  3: ["Third: 12:00-1:30 "],
  4: ["Fourth: 1:45-3:15 "],
  5: ["Fifth: 3:45-5:15 "],
};

semesterDropdown.addEventListener("change", (event) => {
  while (courseDropdown.firstChild) {
    courseDropdown.removeChild(courseDropdown.firstChild);
  }

  courseLabel.style.display = "";

  const selectedSemesters = Array.from(semesterDropdown.selectedOptions).map(
    (option) => option.value
  );

  const semesterCourses = selectedSemesters.flatMap(
    (semester) => courses[semester]
  );

  semesterCourses.forEach((course) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "course";
    checkbox.value = course;
    checkbox.id = `course-${course}`; // Add an id to the checkbox
    checkbox.style.display = "none"; // Hide the checkbox

    const label = document.createElement("label");
    label.htmlFor = `course-${course}`;
    label.appendChild(document.createTextNode(course));

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-check fa-bounce fa-sm";
    icon.style.color = "#0b2447";
    icon.style.display = "none";

    const card = document.createElement("div");
    card.className = "card";
    card.appendChild(checkbox);
    card.appendChild(label);
    card.appendChild(icon);

    card.addEventListener("click", () => {
      checkbox.checked = !checkbox.checked;
      icon.style.display = checkbox.checked ? "inline" : "none";
      dayLabel.style.display = "";
      dayDropdown.style.display = "";

      dayDropdown.addEventListener("change", () => {
        while (slotDropdown.firstChild) {
          slotDropdown.removeChild(slotDropdown.firstChild);
        }

        slotLabel.style.display = "block";

        const selectedDays = Array.from(dayDropdown.selectedOptions).map(
          (option) => option.value
        );

        Object.values(slots)
          .flat()
          .forEach((slot) => {
            const slotCheckbox = document.createElement("input");
            slotCheckbox.type = "checkbox";
            slotCheckbox.name = "slot";
            slotCheckbox.value = slot;
            slotCheckbox.id = `slot-${slot}`; // Add an id to the checkbox
            slotCheckbox.style.display = "none"; // Hide the checkbox

            const slotLabel = document.createElement("label");
            slotLabel.htmlFor = `slot-${slot}`; // Associate the label with the checkbox
            slotLabel.appendChild(document.createTextNode(slot));

            const slotIcon = document.createElement("i");
            slotIcon.className = "fa-solid fa-check fa-bounce fa-sm";
            slotIcon.style.color = "#0b2447";
            slotIcon.style.display = "none";

            const slotCard = document.createElement("div");
            slotCard.className = "card";
            slotCard.appendChild(slotCheckbox);
            slotCard.appendChild(slotLabel);
            slotCard.appendChild(slotIcon);

            slotCard.addEventListener("click", () => {
              slotCheckbox.checked = !slotCheckbox.checked;
              slotIcon.style.display = slotCheckbox.checked ? "inline" : "none";
            });

            slotDropdown.appendChild(slotCard);
          });
      });
    });

    courseDropdown.appendChild(card);
  });
});
