import { userURL } from "../utils/env.js";
import { tost } from "./Toastify.js";
const sendOTP = document.getElementById("OTPBtn");

const OTPType = "forgetPassword";
sendOTP.addEventListener("click", function () {
    const userName = document.getElementById("userName").value;
console.log(userName)
if(userName === "") {
  tost("Please enter the username", "error", 3000);
  return;
}
if(userName.includes("@")) {
    tost("Please enter the username not the email", "error", 3000);
    return;
    }
// store in ls
localStorage.setItem("userName", userName);
  // diable the button 
  sendOTP.style.opacity = "0.5"; // Reduce the opacity
  sendOTP.style.cursor = "not-allowed";
  sendOTP.disabled   = true;


  fetch(userURL + "/sendOTP", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName , OTPType}),
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // enable the button
      sendOTP.style.opacity = "1"; // Reduce the opacity
      sendOTP.style.cursor = "pointer";
      sendOTP.disabled   = false;
      tost("OTP sent successfully!", "success", 3000);
      window.location.href = "../html/forgetPassword.html";
    })
    .catch((error) => {
       // enable the button
       sendOTP.style.opacity = "1"; // Reduce the opacity
       sendOTP.style.cursor = "pointer";
       sendOTP.disabled   = false;
      console.error("Fetch error:", error);
      tost("something went wrong pelase infrom the Admin", "error", 3000);
    });
});


