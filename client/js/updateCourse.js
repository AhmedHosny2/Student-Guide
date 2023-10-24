const submitButton = document.getElementById("submit-button");
if (localStorage.getItem("userName") == null)
window.location.href = "https://www.ahmed-yehia.me/html/login.html";
else {
const loginButton = document.querySelectorAll(".login");
loginButton.forEach((button) => {
  button.style.display = "none";
});
}
  // Add an event listener to the button
  // submitButton.addEventListener("click", function() {
  //   // Your event handling code here
  //   // For example, you can alert a message when the button is clicked
  //   alert("Button clicked!");
  // });