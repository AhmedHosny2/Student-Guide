//start tutorials local storage
const addBtn = document.getElementById("addTutorials");
const clearBtn = document.getElementById("clear");
const tutorialsVal = document.getElementById("tutorials-value");

let arrOfTutorials = [];

addBtn.onclick = (event) => {
  event.preventDefault();

  const tutorialValue = tutorialsVal.value;
  if (tutorialValue.trim() !== "") {
    arrOfTutorials.push(tutorialValue);
    //create tutorial element in page
    const tutorial = document.createElement("div");
    tutorial.className = "tut";
    tutorial.innerHTML = tutorialValue;
    listOfTutorials.appendChild(tutorial);
    //create delete button to remove elements from page
    const delBtn = document.createElement("span");
    delBtn.textContent = "delete";
    delBtn.className = "del";
    tutorial.appendChild(delBtn);

    delBtn.addEventListener("click", () => {
      const index = arrOfTutorials.indexOf(tutorialValue);
      if (index > -1) {
        listOfTutorials.removeChild(tutorial);
        arrOfTutorials.splice(index, 1);
      }
    });
    //used to empty the value to text area each time adding element
    tutorialsVal.value = "";
  }
  //for testing
  console.log(arrOfTutorials);
};

clearBtn.onclick = (event) => {
  event.preventDefault();
  tutorialsVal.value = "";
};
