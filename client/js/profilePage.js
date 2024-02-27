//  localStorage.setItem("isVerified", true);
// localStorage.setItem("semester", "6");
const userNameLS = localStorage.getItem("userName");
const emailLS = localStorage.getItem("userEmail");
const isVerifiedLS = localStorage.getItem("isVerified");
const semesterLS = localStorage.getItem("semester");
const idCardElement = document.querySelector(".profile-wrap .container .idCard");

const isVerified = localStorage.getItem('isVerified') === 'true';
if (isVerified) {
  idCardElement.classList.add("verified");
} else {
  idCardElement.classList.remove("verified");
  // once clicked ref to the email verification page
  idCardElement.addEventListener("click", () => {
    window.location.href = "../html/verfiyEmail.html";
  });
}

const userName = document.getElementById("accName");
const email = document.getElementById("accEmail");
const semester = document.getElementById("accSem");
semester.innerHTML = semesterLS;
email.innerHTML = emailLS;
userName.innerHTML = userNameLS;