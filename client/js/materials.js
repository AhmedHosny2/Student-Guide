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
  // Function to hide the editor and display the content in the div
  function displayContent() {
    const editorContent = tinymce.activeEditor.getContent();
    contentDisplay.innerHTML = editorContent;
  }

  // Event listener for the button click
  submit.addEventListener("click", function () {
    displayContent();
    document.body.classList.toggle("overlay");
    textarea.classList.toggle("show");
    submit.classList.toggle("show");
  });
});