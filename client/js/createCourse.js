const form = document.getElementById("course-form");
import { coursesURL } from "../utils/env.js";
import {tost} from "./Toastify.js"
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const formDataObject = {};

  const editorContent = tiny.activeEditor.getContent();
  formDataObject["content"] = editorContent; // Use "content" as the key

  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  try {
    fetch(coursesURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formDataObject),
    })
      .then((response) => {
        if (!response.ok) {
          tost("Something went wrong please infrom the Admin!", "error", 3000);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        tost("Course added successfully!", "success", 3000);
        form.reset();
        // Handle the response data from the API (e.g., show a success message)
      })
      .catch((error) => {
        tost("Something went wrong please infrom the Admin!", "error", 3000);
        console.error("Fetch error:", error);
      });
  } catch (err) {
    console.error(err);
  }
});



