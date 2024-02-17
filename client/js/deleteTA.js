const btn = document.getElementById("deleteTA");
const emailInput = document.getElementById("email");
import {tost} from "./Toastify.js";
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
      tost("Something went wrong please infrom the Admin!", "error", 3000);
      throw new Error("Network response was not ok");
    }
    tost("TA deleted successfully!", "success", 3000);
    return response.json();
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
});