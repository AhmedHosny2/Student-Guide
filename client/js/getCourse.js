//start text editing
const editBtn = document.querySelector(".text-edit");
const editor = document.getElementById("editor");
const submit = document.querySelector(".submit");
let myEditor;
var readTimeElement = document.querySelector(".readTime");

// Update the content of the element with the new reading time
readTimeElement.innerHTML =
  '<i class="fa-solid fa-book-open-reader"></i> ' +
  localStorage.getItem("readingTime") +
  " min read";
//  hide editor
if (editor) {
  // Set the 'hidden' attribute to true to hide the element
  editor.hidden = true;
} else {
  console.error("Element with id 'editor' not found");
}
const contentDisplay = document.querySelector(".contentDisplay .container");
import { coursesURL } from "../utils/env.js";
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

editBtn.addEventListener("click", () => {
  document.body.classList.toggle("overlay");
  editor.classList.toggle("show");
  submit.classList.toggle("show");
});

document.addEventListener("DOMContentLoaded", function () {
  editor.style.display = "none";
  CKEDITOR.ClassicEditor.create(document.getElementById("editor"), {
    // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format
    toolbar: {
      items: [
        "bold",
        "italic",
        "strikethrough",
        "underline",
        "code",
        "subscript",
        "superscript",
        "removeFormat",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "|",
        "outdent",
        "indent",
        "|",
        "findAndReplace",
        "selectAll",
        "|",
        "heading",
        "|",

        "undo",
        "redo",
        "-",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "highlight",
        "|",
        "alignment",
        "|",
        "link",
        "uploadImage",
        "blockQuote",
        "insertTable",
        "mediaEmbed",
        "codeBlock",
        "|",
        "specialCharacters",
        "horizontalLine",
        "pageBreak",
        "|",

        "sourceEditing",
      ],
      shouldNotGroupWhenFull: true,
    },
    // Changing the language of the interface requires loading the language file using the <script> tag.
    // language: 'es',
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
    placeholder: "Welcome to CKEditor 5!",
    // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
    fontFamily: {
      options: [
        "default",
        "Arial, Helvetica, sans-serif",
        "Courier New, Courier, monospace",
        "Georgia, serif",
        "Lucida Sans Unicode, Lucida Grande, sans-serif",
        "Tahoma, Geneva, sans-serif",
        "Times New Roman, Times, serif",
        "Trebuchet MS, Helvetica, sans-serif",
        "Verdana, Geneva, sans-serif",
      ],
      supportAllValues: true,
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
    fontSize: {
      options: [10, 12, 14, "default", 18, 20, 22],
      supportAllValues: true,
    },
    // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
    // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
    htmlSupport: {
      allow: [
        {
          name: /.*/,
          attributes: true,
          classes: true,
          styles: true,
        },
      ],
    },
    // Be careful with enabling previews
    // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
    htmlEmbed: {
      showPreviews: true,
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
    link: {
      decorators: {
        addTargetToExternalLinks: true,
        defaultProtocol: "https://",
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
    mention: {
      feeds: [
        {
          marker: "@",
          feed: [
            "@apple",
            "@bears",
            "@brownie",
            "@cake",
            "@cake",
            "@candy",
            "@canes",
            "@chocolate",
            "@cookie",
            "@cotton",
            "@cream",
            "@cupcake",
            "@danish",
            "@donut",
            "@dragée",
            "@fruitcake",
            "@gingerbread",
            "@gummi",
            "@ice",
            "@jelly-o",
            "@liquorice",
            "@macaroon",
            "@marzipan",
            "@oat",
            "@pie",
            "@plum",
            "@pudding",
            "@sesame",
            "@snaps",
            "@soufflé",
            "@sugar",
            "@sweet",
            "@topping",
            "@wafer",
          ],
          minimumCharacters: 1,
        },
      ],
    },
    // The "superbuild" contains more premium features that require additional configuration, disable them below.
    // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
    removePlugins: [
      // These two are commercial, but you can try them out without registering to a trial.
      // 'ExportPdf',
      // 'ExportWord',
      "AIAssistant",
      "CKBox",
      "CKFinder",
      "EasyImage",
      // This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
      // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
      // Storing images as Base64 is usually a very bad idea.
      // Replace it on production website with other solutions:
      // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
      // 'Base64UploadAdapter',
      "RealTimeCollaborativeComments",
      "RealTimeCollaborativeTrackChanges",
      "RealTimeCollaborativeRevisionHistory",
      "PresenceList",
      "Comments",
      "TrackChanges",
      "TrackChangesData",
      "RevisionHistory",
      "Pagination",
      "WProofreader",
      // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
      // from a local file system (file://) - load this site via HTTP server if you enable MathType.
      "MathType",
      // The following features are part of the Productivity Pack and require additional license.
      "SlashCommand",
      "Template",
      "DocumentOutline",
      "FormatPainter",
      "TableOfContents",
      "PasteFromOfficeEnhanced",
      "CaseChange",
    ],
  }).then((editor) => {
    editor.setData(localStorage.getItem("courseData"));
    myEditor = editor;
  });

  // ===================================================

  // localStorage.setItem("courseData", `<h1><span style="color: rgb(241, 196, 15);"><strong><span style="font-family: 'arial black', sans-serif;">cool</span></strong></span></h1>`);
  if (localStorage.getItem("courseData")) {
    contentDisplay.innerHTML = localStorage.getItem("courseData");
  }
  function displayContent() {
    const editorContent = myEditor.getData();
    if (editorContent !== "") {
      localStorage.setItem("courseData", editorContent);
    }

    // change the content of tinymce
    console.log(localStorage.getItem("courseData"));
    contentDisplay.innerHTML = editorContent;
  }

  // Event listener for the button click
  submit.addEventListener("click", function () {
    if (myEditor.getData() < localStorage.getItem("courseData").length * 0.7) {
      alert("You have to write at least 70% of the content");
      return;
    }
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
