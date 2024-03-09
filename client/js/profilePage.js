document.addEventListener("DOMContentLoaded", () => {
  const modal = document.createElement("div");
  modal.className = "modal";

  const card = document.createElement("div");
  card.className = "card";

  modal.appendChild(card);
  document.body.appendChild(modal);

  const h1 = document.createElement("p");
  h1.textContent = "Drop your image here or click to upload.";
  card.appendChild(h1);

  const uploadBtn = document.createElement("input");
  const uploadText = document.createElement("label");
  const icon = document.createElement("i");

  uploadBtn.type = "file";
  uploadBtn.accept = "image/*";
  uploadBtn.id = "file";
  uploadBtn.className = "upload-btn";

  icon.className = "fa-solid fa-arrow-up-from-bracket";
  uploadText.appendChild(icon);

  const textNode = document.createTextNode("Upload File");
  uploadText.appendChild(textNode);

  uploadText.htmlFor = "file";
  uploadText.className = "upload-text";

  card.appendChild(uploadText);
  card.appendChild(uploadBtn);
  const editBtn = document.getElementById("editBtn");

  editBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });
  card.addEventListener("dragover", (event) => {
    event.preventDefault();
    card.style.backgroundColor = "rgba(0, 0, 0, 0.15)";
  });
  card.addEventListener("dragleave", (event) => {
    event.preventDefault();
    card.style.backgroundColor = "rgba(0, 0, 0, 0)";
  });

  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
  const userNameLS = localStorage.getItem("userName");
  const emailLS = localStorage.getItem("userEmail");
  const semesterLS = localStorage.getItem("semester");
  const idCardElement = document.querySelector(
    ".profile-wrap .container .idCard"
  );

  const userName = document.getElementById("accName");
  const emailInput = document.getElementById("accEmail");
  emailInput.disabled = true;
  const semesterInput = document.getElementById("accSem");
  semesterInput.disabled = true;

  userName.innerHTML =
    "Welcome " +
    userNameLS.charAt(0).toUpperCase() +
    userNameLS.slice(1).toLowerCase();
  emailInput.value = emailLS;
  semesterInput.value = semesterLS;
  const profileTitle = document.getElementById("title");

  const isVerified = localStorage.getItem("isVerified") === "true";
  if (isVerified) {
    profileTitle.classList.add("verified");
    profileTitle.appendChild("verified");
  } else {
    profileTitle.classList.remove("verified");
    profileTitle.addEventListener("click", () => {
      window.location.href = "../html/verifyEmail.html";
    });
  }

  // const saveBtn = document.getElementById("saveBtn");
  // saveBtn.disabled = true;
  // function checkDataChange() {
  //   if (emailInput.value !== emailLS || semesterInput.value !== semesterLS) {
  //     saveBtn.disabled = false;
  //   } else {
  //     saveBtn.disabled = true;
  //   }
  // }

  // // Add event listeners to the input fields
  // emailInput.addEventListener("input", checkDataChange);
  // semesterInput.addEventListener("input", checkDataChange);

  // saveBtn.addEventListener("click", () => {
  //   const newEmail = emailInput.value;
  //   const newSemester = semesterInput.value;
  //   // You can add validation here if needed
  //   localStorage.setItem("userEmail", newEmail);
  //   localStorage.setItem("semester", newSemester);
  //   // Optionally, update the displayed values
  //   emailInput.value = newEmail;
  //   semesterInput.value = newSemester;
  //   alert("Changes saved successfully!");
  // });

  // Create the modal and card elements
});
