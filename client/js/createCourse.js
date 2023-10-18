document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("course-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log("create courese started ");
    const formData = new FormData(form);
    const formDataObject = {};

    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      // const apiUrl = `http://localhost:5002/course`; // Replace with your API URL here
      const apiUrl = `https://student-guide-course.ahmed-yehia.me/course`; // Replace with your API URL here
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formDataObject),
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
    } catch (err) {
      console.error(err);
    }
  });
});
//add text area api
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
});
