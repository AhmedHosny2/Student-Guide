// function fetchTAData() {
//   const apiUrl = `https://ta.ahmed-yehia.me/TADirectory`; // Replace with your API URL here
//   fetch(apiUrl, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       generateTACards(data);
//       console.log("Response from the API:", data);
//     })
//     .catch((error) => {
//       console.error("Fetch error:", error);
//     });
// }
const ta = [
  {
    _id: "652552af8c1396cc6305db08",
    name: "donia",
    email: "doni.ail@giu-uni.de",
    course: "se",
    officeHours: "3 till 5 sat",
    officeLocation: "a230",
    tutorials: [11, 12, 13],
    __v: 0,
  },
  {
    _id: "652552b88c1396cc6305db0b",
    name: "donia",
    email: "doni.ail@giu-uni.de",
    course: "oop",
    officeHours: "3 till 5 sat",
    officeLocation: "a230",
    tutorials: [11, 12, 13],
    __v: 0,
  },
  {
    _id: "652552bd8c1396cc6305db0e",
    name: "donia",
    email: "doni.ail@giu-uni.de",
    course: "cs1",
    officeHours: "3 till 5 sat",
    officeLocation: "a230",
    tutorials: [11, 12, 13],
    __v: 0,
  },
  {
    _id: "652552c68c1396cc6305db11",
    name: "yaya",
    email: "yaya.ail@giu-uni.de",
    course: "cs1",
    officeHours: "3 till 5 sat",
    officeLocation: "a230",
    tutorials: [11, 12, 13],
    __v: 0,
  },
  {
    _id: "65317b8e9cc46b36bedd8da9",
    name: "donjklia",
    email: "donihh.ail@giu-uni.de",
    course: "cs1",
    officeHours: "3 till 5 sat",
    officeLocation: "a230",
    tutorials: [11, 12, 13],
    __v: 0,
  },
];
let arr = [];
generateTACards(ta);
// Your existing code for generating cards
function generateTACards(taData) {
  const cardContainer = document.querySelector(".card-wrap");

  taData.forEach((ta) => {
    const card = document.createElement("section");
    card.classList.add("card");

    const courseName = document.createElement("div");
    courseName.classList.add("course");
    courseName.textContent = ta.course; // Replace with the actual course name

    const box = document.createElement("div");
    box.classList.add("box");

    // Helper function to create a card wrap element
    function createCardWrap(label, value) {
      const wrap = document.createElement("div");
      wrap.classList.add("wrap");

      const p = document.createElement("p");
      p.textContent = label;

      const span = document.createElement("span");
      span.textContent = value;

      wrap.appendChild(p);
      wrap.appendChild(span);

      return wrap;
    }

    box.appendChild(createCardWrap("name", ta.name));
    box.appendChild(createCardWrap("office hour", ta.officeHours));
    box.appendChild(createCardWrap("office location", ta.officeLocation));
    box.appendChild(createCardWrap("tutorials", ta.tutorials));

    // Create the email element with a clickable link
    const emailWrap = createCardWrap("email", "");
    const emailLink = document.createElement("a");
    emailLink.href = `mailto:${ta.email}`;
    emailLink.textContent = ta.email;
    emailLink.style.color = "gray";
    emailWrap.appendChild(emailLink);
    box.appendChild(emailWrap);

    card.appendChild(courseName);
    card.appendChild(box);

    cardContainer.appendChild(card);
    arr.push(card);
  });
}
console.log(arr);
// Add an input event listener to the search bar
searchBar.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();

  // Loop through all the cards
  arr.forEach((card) => {
    console.log("hi");
    const courseName = card.querySelector(".course").textContent.toLowerCase();
    const isVisible = courseName.includes(searchValue);
    card.classList.add("hide", isVisible);
  });
});
// Call the function to generate and append the cards
// fetchTAData();
