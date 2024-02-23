import { userURL } from "../utils/env.js";
import { tost } from "./Toastify.js";
const submitButton = document.getElementById("OTPBtn");
const OTPInput = document.getElementById("OTP");
const userName = localStorage.getItem("userName");
const OTPType = "forgetPassword";
const resendOTPBtn = document.getElementById("resendOTPBtn");
resendOTPBtn.addEventListener("click", function () {
  // diable the button 
  resendOTPBtn.style.opacity = "0.5"; // Reduce the opacity
  resendOTPBtn.style.cursor = "not-allowed";
  resendOTPBtn.disabled   = true;


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
      resendOTPBtn.style.opacity = "1"; // Reduce the opacity
      resendOTPBtn.style.cursor = "pointer";
      resendOTPBtn.disabled   = false;
      tost("OTP sent successfully!", "success", 3000);
    })
    .catch((error) => {
       // enable the button
       resendOTPBtn.style.opacity = "1"; // Reduce the opacity
       resendOTPBtn.style.cursor = "pointer";
       resendOTPBtn.disabled   = false;
      console.error("Fetch error:", error);
      tost("CHECK YOUR JUNK NOT YOUR INBOX !!!!", "error", 3000);
    });
});

submitButton.addEventListener("click", function () {
  const OTP = OTPInput.value.trim();
const newPassword = document.getElementById("newPass").value;

console.log(newPassword);
  if (newPassword === "") {
    tost("Please enter the OTP", "error", 3000);
    return;
  }
  fetch(userURL + "/forgetPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ OTP, userName, newPassword }),
  })
    .then((response) => {
      if (!response.ok) {
        tost("Invalid OTP check your inbox/ junk emails or your OTP is experied", "error", 3000);
        throw new Error("Network response was not ok");
      } 
      tost("password changed successfully", "success", 3000);
      window.location.href = "../html/login.html";
      return response.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});
