import { userURL } from "../utils/env.js";
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
  .then((data) => {
    console.log("Response from the API:", data);
  })
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
    body: JSON.stringify({ OTP , userEmail }),
  })
    .then((response) => {
      if (!response.ok) {
        alert("Invalid OTP");
        throw new Error("Network response was not ok");
      }
      alert("Email verified");
      window.location.href = "../index.html";
      return response.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});
const inputs = document.getElementById("inputs");
 
inputs.addEventListener("input", function (e) {
    const target = e.target;
    const val = target.value;
 
    if (isNaN(val)) {
        target.value = "";
        return;
    }
 
    if (val != "") {
        const next = target.nextElementSibling;
        if (next) {
            next.focus();
        }
    }
});
 
inputs.addEventListener("keyup", function (e) {
    const target = e.target;
    const key = e.key.toLowerCase();
 
    if (key == "backspace" || key == "delete") {
        target.value = "";
        const prev = target.previousElementSibling;
        if (prev) {
            prev.focus();
        }
        return;
    }
});
