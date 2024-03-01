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
  Saturday: ["First ", "Second ", "Third ", "Fourth ", "Fifth "],
  Sunday: ["First ", "Second ", "Third ", "Fourth ", "Fifth "],
  Monday: ["First ", "Second ", "Third ", "Fourth ", "Fifth "],
  Tuesday: ["First ", "Second ", "Third ", "Fourth ", "Fifth "],
  Wednesday: ["First ", "Second ", "Third ", "Fourth ", "Fifth "],
  Thursday: ["First ", "Second ", "Third ", "Fourth ", "Fifth "],
};

// Create an object to store the selected slots for each day
const selectedSlots = {};

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
    checkbox.id = `course-${course}`;
    checkbox.style.display = "none";

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
    });

    courseDropdown.appendChild(card);
  });

  dayDropdown.addEventListener("change", () => {
    while (slotDropdown.firstChild) {
      slotDropdown.removeChild(slotDropdown.firstChild);
    }

    slotLabel.style.display = "block";

    const selectedDays = Array.from(dayDropdown.selectedOptions).map(
      (option) => option.value
    );

    selectedDays.forEach((day) => {
      slots[day].forEach((slot) => {
        const slotCheckbox = document.createElement("input");
        slotCheckbox.type = "checkbox";
        slotCheckbox.name = "slot";
        slotCheckbox.value = slot;
        slotCheckbox.id = `slot-${day}-${slot}`;
        slotCheckbox.style.display = "none";

        const slotLabel = document.createElement("label");
        slotLabel.htmlFor = `slot-${day}-${slot}`;
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

        if (selectedSlots[day] && selectedSlots[day].includes(slot)) {
          slotCheckbox.checked = true;
          slotIcon.style.display = "inline";
        }

        slotCard.addEventListener("click", () => {
          slotCheckbox.checked = !slotCheckbox.checked;
          slotIcon.style.display = slotCheckbox.checked ? "inline" : "none";

          // Update the selected slots for the day
          if (!selectedSlots[day]) {
            selectedSlots[day] = [];
          }

          if (slotCheckbox.checked) {
            selectedSlots[day].push(slot);
          } else {
            const index = selectedSlots[day].indexOf(slot);
            if (index > -1) {
              selectedSlots[day].splice(index, 1);
            }
          }
        });

        slotDropdown.appendChild(slotCard);
      });
    });
  });
});
document.getElementById("studentId").addEventListener("input", function () {
  if (this.value.length > 7) {
    this.value = this.value.slice(0, 7);
  }
});
