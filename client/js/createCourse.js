document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("userName") == null)
    window.location.href = "https://www.ahmed-yehia.me/html/login.html";
  else {
    const avatar = document.querySelector(".avatar i");
    avatar.classList.add("show");
    const loginButton = document.querySelectorAll(".login");
    loginButton.forEach((button) => {
      button.style.display = "none";
    });
  }

  const form = document.getElementById("course-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log("create course started");
    const formData = new FormData(form);
    const formDataObject = {};

    const editorContent = tiny.activeEditor.getContent();
    // console.log(editorContent);
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
            animateFailureAlert("Course creation failed", 3000);
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          animateAlert("Course created successfully", 3000);
          console.log("Response from the API:", data);
          // Handle the response data from the API (e.g., show a success message)
        })
        .catch((error) => {
          animateFailureAlert(
            "This course name or code was created before !",
            3000
          );

          console.error("Fetch error:", error);
        });
    } catch (err) {
      console.error(err);
    }
  });
});
import { coursesURL } from "../utils/env.js";
// Add the code for initializing the TinyMCE editor below this comment
let tiny = "";
document.addEventListener("DOMContentLoaded", function () {
  tinymce.init({
    selector: "textarea",
    plugins:
      "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
    toolbar:
      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
    tinycomments_mode: "embedded",
    tinycomments_author: "Author name",
    mergetags_list: [
      { value: "First.Name", title: "First Name" },
      { value: "Email", title: "Email" },
    ],
    ai_request: (request, respondWith) =>
      respondWith.string(() =>
        Promise.reject("See docs to implement AI Assistant")
      ),
  });
  tiny = tinymce;
});

function animateAlert(message, duration) {
  const alertDiv = document.createElement("div");
  alertDiv.textContent = message;
  alertDiv.style.position = "fixed";
  alertDiv.style.top = "10px";
  alertDiv.style.left = "50%";
  alertDiv.style.transform = "translateX(-50%)";
  alertDiv.style.backgroundColor = "lightgreen"; // Green background
  alertDiv.style.color = "green"; // Green text color
  alertDiv.style.padding = "10px";
  alertDiv.style.border = "1px solid #008000"; // Green border
  alertDiv.style.borderRadius = "5px";
  alertDiv.style.textAlign = "center";
  alertDiv.style.opacity = 0;
  alertDiv.style.transition = "opacity 0.5s ease-in-out";

  document.body.appendChild(alertDiv);

  setTimeout(function () {
    alertDiv.style.opacity = 1;
  }, 10); // Delay for a smooth appearance

  setTimeout(function () {
    alertDiv.style.opacity = 0;
    setTimeout(function () {
      document.body.removeChild(alertDiv);
    }, 500); // Remove the alert after the fade-out animation
  }, duration);
}

function animateFailureAlert(message, duration) {
  const alertDiv = document.createElement("div");
  alertDiv.textContent = message;
  alertDiv.style.position = "fixed";
  alertDiv.style.top = "10px";
  alertDiv.style.left = "50%";
  alertDiv.style.transform = "translateX(-50%)";
  alertDiv.style.backgroundColor = "lightcoral"; // Red background
  alertDiv.style.color = "red"; // Red text color
  alertDiv.style.padding = "10px";
  alertDiv.style.border = "1px solid #FF0000"; // Red border
  alertDiv.style.borderRadius = "5px";
  alertDiv.style.textAlign = "center";
  alertDiv.style.opacity = 0;
  alertDiv.style.transition = "opacity 0.5s ease-in-out";

  document.body.appendChild(alertDiv);

  setTimeout(function () {
    alertDiv.style.opacity = 1;
  }, 10); // Delay for a smooth appearance

  setTimeout(function () {
    alertDiv.style.opacity = 0;
    setTimeout(function () {
      document.body.removeChild(alertDiv);
    }, 500); // Remove the alert after the fade-out animation
  }, duration);
}
