import { userURL, clientURL } from "../utils/env.js";
import { tost } from "./Toastify.js";

const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  const loginLoader = document.getElementById("loginLoader");
  const loginBtnTxt = document.getElementById("loginBtnTxt");
  loginLoader.style.display = "block";
  loginBtnTxt.style.display = "none";

  const apiUrl = `${userURL}/login`;
  let status;
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formDataObject),
  })
    .then((response) => {
      if (!response.ok) {
        loginLoader.style.display = "none";
        loginBtnTxt.style.display = "block";
        tost("Invalid email or password", "error", 3000);
        throw new Error("Network response was not ok");
      }
      status = response.status;

      // the response used .send in backend
      return response.text();
    })
    .then((data) => {
      data = JSON.parse(data);
      localStorage.setItem("userEmail", data.email);
      if (status === 207) {
       tost("Please verify your email! check inbox and junk emails", "info", 7000);
        window.location.href = "../html/verfiyEmail.html";
        return;
      }
      localStorage.setItem("isAdmin", data.isAdmin);
      localStorage.setItem("userName", data.userName);
      window.location.href = clientURL;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});



//start login styling animation
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const wrapper = document.querySelector(".wrapper");

signUpButton.addEventListener("click", () => {
  wrapper.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  wrapper.classList.remove("right-panel-active");
});

//responsive login page
const signUpSwitch = document.querySelector(".signIn-box .signUp-switch");
const signInSwitch = document.querySelector(".signUp-box .signIn-switch");
const signUp_box = document.querySelector(".wrapper .signUp-box");

signUpSwitch.addEventListener("click", () => {
  signUp_box.classList.add("active");
});

signInSwitch.addEventListener("click", () => {
  signUp_box.classList.remove("active");
});
const forgetPassword = document.getElementById("forget-password");
forgetPassword.addEventListener("click", () => {
  
  window.location.href = "../html/userEmail.html";
});
