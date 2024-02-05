const btn = document.getElementById("deleteTA");
const emailInput = document.getElementById("email");

import { taURL } from "../utils/env.js";
btn.addEventListener("click", function () {
    const email = emailInput.value;
fetch(taURL + "/delete", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  body: JSON.stringify({ email }),
})
  .then((response) => {
    if (!response.ok) {
      alert("TA not found");
      throw new Error("Network response was not ok");
    }
    alert("TA deleted");
    return response.json();
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
});