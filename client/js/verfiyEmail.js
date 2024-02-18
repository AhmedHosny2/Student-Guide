import { userURL } from "../utils/env.js";
import { tost } from "./Toastify.js";
const submitButton = document.getElementById("OTPBtn");
const OTPInput = document.getElementById("OTP");
const userEmail = localStorage.getItem("userEmail");
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
    body: JSON.stringify({ userEmail }),
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
      tost("Error sending OTP please infrom the Admin !", "error", 3000);
    });
});

submitButton.addEventListener("click", function () {
  const OTP = OTPInput.value;
  fetch(userURL + "/verifyOTP", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ OTP, userEmail }),
  })
    .then((response) => {
      if (!response.ok) {
        tost("Invalid OTP check your inbox/ junk emails ", "error", 3000);
        throw new Error("Network response was not ok");
      }
      tost("Email verified successfully!", "success", 3000);
      window.location.href = "../index.html";
      return response.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});
