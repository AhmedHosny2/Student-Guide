import  {userURL, clientURL} from "../utils/env.js";
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");
  const protectedRouteButton = document.getElementById(
    "protected-route-button"
  );
  const adminRouteButton = document.getElementById("admin-route-button");

  
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    const apiUrl =`${userURL}/login`; 

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
          throw new Error("Network response was not ok");
        }
        if(response.status === 207){
          localStorage.setItem("userEmail", formDataObject.email);
          alert("verfiy your email first!");
          window.location.href = "../html/verfiyEmail.html";
          return;

        }
        // the response used .send in backend
          console.log(response.headers);
        return response.text();
      })
      .then((data) => {
        data = JSON.parse(data);
        console.log("Response from the API:", data);
        //once user logged in switch to the home https://www.ahmed-yehia.me/index.html
        // here
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userName", data.userName);
        localStorage.setItem("isAdmin", data.isAdmin);
        window.location.href = clientURL;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });

  document
    .getElementById("google-login-button")
    .addEventListener("click", function () {
      window.location.href =
        "https://student-guide-users.vercel.app/auth/google";
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

