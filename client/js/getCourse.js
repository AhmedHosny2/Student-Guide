//start text editing
const editBtn = document.querySelector(".text-edit");
const submit = document.querySelector(".submit");
const textarea = document.querySelector(".text-box");
const contentDisplay = document.querySelector(".contentDisplay .container p");

editBtn.addEventListener("click", () => {
  document.body.classList.toggle("overlay");
  textarea.classList.toggle("show");
  submit.classList.toggle("show");
});

document.addEventListener("DOMContentLoaded", function () {
  tinymce.init({
    selector: "textarea",
    setup: function (editor) {
      editor.on("init", function (e) {
        editor.setContent(localStorage.getItem("courseData"));
      });
    },
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
  // localStorage.setItem("courseData", `<h1><span style="color: rgb(241, 196, 15);"><strong><span style="font-family: 'arial black', sans-serif;">cool</span></strong></span></h1>`);
  if (localStorage.getItem("courseData")) {
    contentDisplay.innerHTML = localStorage.getItem("courseData");
  }
  function displayContent() {
    const editorContent = tinymce.activeEditor.getContent();
    if (editorContent !== "") {
      localStorage.setItem("courseData", editorContent);
    }

    // change the content of tinymce
    console.log(localStorage.getItem("courseData"));
    contentDisplay.innerHTML = editorContent;
  }

  // Event listener for the button click
  submit.addEventListener("click", function () {
    updateCourse();
    displayContent();
    document.body.classList.toggle("overlay");
    textarea.classList.toggle("show");
    submit.classList.toggle("show");
    // update the value in the DB
  });
});

const updateCourse = async () => {
  const courseName = localStorage.getItem("courseName");
  const content = localStorage.getItem("courseData");
  const url = `https://student-guide-course.ahmed-yehia.me/course/${courseName}`; //here
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
      console.log("Response from the API:", data);
      // Handle the response data from the API (e.g., show a success message)
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

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
  console.log(val);
  //reset the value of text box
  image_url.value = "";
  //adding image to the avatar box
  let newAvatar = document.createElement("img");
  newAvatar.src = val;
  console.log(newAvatar);
  avatarBox.appendChild(newAvatar);
});
