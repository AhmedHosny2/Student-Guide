import { userURL } from "../utils/env.js";
import { tost } from "./Toastify.js";

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector(".signup-form");
  const tarole = document.getElementById("taRole");
  const semesterSelection = document.getElementById("semester");
  tarole.style.display = "none";

  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");

  passwordField.addEventListener("focus", () => {
    if (emailField.value.includes("@giu-uni.de")) {
      semesterSelection.style.display = "none";
      tarole.style.display = "block";
    }
  });

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(signupForm);
    const formDataObject = {};

    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    if (!formDataObject.email.includes("giu-uni.de")) {
      tost("Email should be a GIU email", "error", 3000);
      return;
    }
    const apiUrl = `${userURL}/signup`;
    const signUpLoader = document.getElementById("signUpLoader");
    const signUpBtnTxt = document.getElementById("signUpBtnTxt");

    signUpLoader.style.display = "block";
    signUpBtnTxt.style.display = "none";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    })
      .then((response) => {
        if (response.status === 402) {
          tost("Email or userName is already taken", "error", 3000);
        }
        if (response.status === 401) {
          tost("It should be a GIU email", "error", 3000);
        }

        if (!response.ok) {
          signUpLoader.style.display = "none";
          signUpBtnTxt.style.display = "block";
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        tost(
          "Please verify your email! check inbox and junk emails it might take couple of mintues",
          "info",
          5000
        );
        localStorage.setItem("userEmail", formDataObject.email);

        setTimeout(() => {
          window.location.href = "../html/verfiyEmail.html";
        }, 5000);

        // Handle the response data from the API (e.g., show a success message)
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });
});
