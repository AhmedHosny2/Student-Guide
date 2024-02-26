localStorage.setItem("isVerified", true);

const idCardElement = document.querySelector(".profile-wrap .container .idCard");

const isVerified = localStorage.getItem('isVerified') === 'true';
if (isVerified) {
  idCardElement.classList.add("verified");
} else {
  idCardElement.classList.remove("verified");
}