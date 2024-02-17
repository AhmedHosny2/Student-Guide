import { userURL } from "../utils/env.js";
import { tost } from "./Toastify.js";
const submitButton = document.getElementById("OTPBtn");
const OTPInput = document.getElementById("OTP");
const userEmail = localStorage.getItem("userEmail");

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
  .then((data) => {})
  .catch((error) => {
    console.error("Fetch error:", error);
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
