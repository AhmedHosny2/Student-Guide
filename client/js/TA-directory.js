// start search bar
const arrOfSubjects = [];
const cards = document.querySelectorAll(".card");
const cardsNames = document.querySelectorAll(".card .course");
cardsNames.forEach((ele) => {
  arrOfSubjects.push(ele.outerText);
});

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  arrOfSubjects.forEach((e, i) => {
    const isVisible = e.toLowerCase().includes(value);
    cards[i].classList.toggle("hide", !isVisible);
  });
});
