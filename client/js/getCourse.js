import { tost } from "./Toastify.js";
window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loader");
  loadingScreen.style.display = "none";
});
const editBtn = document.querySelector(".text-edit");
const editor = document.getElementById("editor");
const submit = document.querySelector(".submit");
let myEditor;
let readTimeElement = document.querySelector(".readTime");

// Update the content of the element with the new reading time
readTimeElement.innerHTML =
  '<i class="fa-solid fa-book-open-reader"></i> ' +
  localStorage.getItem("readingTime") +
  " min read";
//  hide editor

const contentDisplay = document.querySelector(".contentDisplay .container");
import { coursesURL } from "../utils/env.js";

editBtn.addEventListener("click", () => {
  let ckeditorScript = document.createElement("script");

  // Set the src attribute to the CKEditor script URL
  ckeditorScript.src = "https://cdn.ckeditor.com/4.17.1/standard/ckeditor.js"; // replace
  ckeditorScript.type = "text/javascript";
  ckeditorScript.integrity =
    "sha512-g+ANYpPSUKcvl16qW21wLjfIrqU2wCKIcQneFAlBJWKmBB4KM98j0tBPGiCgVHJgqzEPiLq+yaZHObRVi87vjw==";
    ckeditorScript.crossOrigin = "anonymous";
  // Define a function to be called after the script is loaded
  ckeditorScript.onload = function () {
    // CKEditor script has been loaded, now create the CKEditor instance with custom configuration
    // replace
    CKEDITOR.replace("editor", {
      toolbar: [
        { name: "undo", items: ["Undo"] },
        { name: "redo", items: ["Redo"] },
        { name: "heading", items: ["heading"] },
        {
          name: "basicstyles",
          items: [
            "Bold",
            "Italic",
            "Underline",
            "Strike",
            "Subscript",
            "Superscript",
            "-",
            "RemoveFormat",
          ],
        },
        {
          name: "styles",
          items: [
            "Format",
            "Font",
            "FontSize",
            "FontFamily",
            "TextColor",
            "fontBackgroundColor",
          ],
        }, // Add Font Size, Font Family, Font Color, and Background Color
        { name: "colors", items: ["TextColor", "BGColor"] },
        { name: "code", items: ["Code"] }, // Add code place
        { name: "insert", items: ["Table", "HorizontalRule"] }, // Add embed table
        { name: "link", items: ["Link", "Unlink"] }, // Add links
        { name: "uploadImage", items: ["uploadImage"] },
        { name: "blockQuote", items: ["Blockquote"] },
        { name: "codeBlock", items: ["CodeBlock"] },
        { name: "bulletedList", items: ["BulletedList"] },
        { name: "numberedList", items: ["NumberedList"] },
        { name: "todoList", items: ["TodoList"] },
        { name: "outdent", items: ["Outdent"] },
        { name: "indent", items: ["Indent"] },
      ],
      // add styles to the editor
    });

    // Get the CKEditor instance and store it in a variable
    myEditor = CKEDITOR.instances.editor;
    myEditor.setData(contentDisplay.innerHTML);
  };

  // Append the script element to the document's head
  document.head.appendChild(ckeditorScript);
  document.body.classList.toggle("overlay");
  submit.classList.toggle("show");
});

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("courseData")) {
    contentDisplay.innerHTML = localStorage.getItem("courseData");
  }
  function displayContent() {
    const editorContent = myEditor.getData();
    if (editorContent !== "") {
      localStorage.setItem("courseData", editorContent);
    }

    // change the content of tinymce
    contentDisplay.innerHTML = editorContent;
  }

  const updateCourse = async () => {
    const courseName = localStorage.getItem("courseName");
    const newContent = myEditor.getData();
    if (newContent) {
      localStorage.setItem("courseData", newContent);
    }
    const content = localStorage.getItem("courseData");

    const url = `${coursesURL}/${courseName}`; //here
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ content }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data from the API (e.g., show a success message)
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  // Event listener for the button click
  submit.addEventListener("click", function () {
    if (myEditor.getData() < localStorage.getItem("courseData").length * 0.7) {
      tost("Please add more content", "error", 3000);
      return;
    }
    updateCourse();
    displayContent();
    document.body.classList.toggle("overlay");
    // textarea.classList.toggle("show");
    submit.classList.toggle("show");
    // update the value in the DB
  });
});

//add person
const addPerson = document.querySelector(".button-wrap .add-person");
const image_url = document.querySelector(".image-box input");
const subBtn = document.querySelector(".image-box .submit-btn");
const imgBox = document.querySelector(".image-box .container");
const avatarBox = document.querySelector(".participants");

addPerson.addEventListener("click", () => {
  imgBox.classList.toggle("active");
});

subBtn.addEventListener("click", () => {
  let val = image_url.value;
  //reset the value of text box
  image_url.value = "";
  //adding image to the avatar box
  let newAvatar = document.createElement("img");
  newAvatar.src = val;
  avatarBox.appendChild(newAvatar);
});

if (
  localStorage.getItem("isAdmin") === "false" ||
  localStorage.getItem("isAdmin") == null
) {
  editBtn.style.display = "none";
  addPerson.style.display = "none";
}
