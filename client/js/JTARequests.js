import { userURL, clientLoginURL } from "../utils/env.js";
import { tost } from "./Toastify.js";
document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("select-all").addEventListener("change", function () {
    document.querySelectorAll(".select-row").forEach(function (checkbox) {
      checkbox.checked = this.checked;
    }, this);
  });

  const tbody = document.getElementById("tbody");
  const pageData = document.getElementById("yaya");
  const loader = document.getElementById("loader");
  loader.style.display = "none";

  function fetchTAData() {
    loader.style.display = "flex";
    pageData.style.display = "none";
    fetch(userURL + "/getJTA", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          tost("Login and verify your Email", "error", 3000);
          loader.style.display = "none";
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        loader.style.display = "none";
        pageData.style.display = "grid";
        // searchInput.style.display = "";

        tbody.innerHTML = "";

        data.forEach((item) => {
          const row = document.createElement("tr");

          const checkboxCell = document.createElement("td");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.className = "select-row";
          checkboxCell.appendChild(checkbox);

          const nameCell = document.createElement("td");
          const nameWrapper = document.createElement("div");
          nameWrapper.className = "img-name-wrapper";
          const img = document.createElement("img");
          img.src = "../images/profile pic2.svg";
          nameWrapper.appendChild(img);
          //to make it capital and no @giu
          nameWrapper.appendChild(
            document.createTextNode(
              item.email.split("@")[0].split(".")[0].charAt(0).toUpperCase() +
                item.email.split("@")[0].split(".")[0].slice(1).toLowerCase() +
                " " +
                (item.email
                  .split("@")[0]
                  .split(".")[1]
                  .charAt(0)
                  .toUpperCase() +
                  item.email.split("@")[0].split(".")[1].slice(1).toLowerCase())
            )
          );
          nameCell.appendChild(nameWrapper);

          const idCell = document.createElement("td");
          idCell.textContent = item.Id;

          const courseCell = document.createElement("td");
          courseCell.textContent = item.courseName;

          const dateCell = document.createElement("td");
          dateCell.textContent = item.Date;

          const statusCell = document.createElement("td");
          statusCell.textContent = item.requestStatus;

          const actionCell = document.createElement("td");
          const approveButton = document.createElement("button");
          approveButton.className = "JTARequests-content-table-table-btn";
          const approveIcon = document.createElement("i");
          approveIcon.className =
            "fas fa-check JTARequests-content-table-table-btn-icon";
          approveButton.appendChild(approveIcon);
          approveButton.appendChild(document.createTextNode("Approve"));
          const rejectButton = document.createElement("button");
          rejectButton.className = "JTARequests-content-table-table-btn";
          const rejectIcon = document.createElement("i");
          rejectIcon.className =
            "fas fa-times JTARequests-content-table-table-btn-icon";
          rejectButton.appendChild(rejectIcon);
          rejectButton.appendChild(document.createTextNode("Reject"));
          actionCell.appendChild(approveButton);
          actionCell.appendChild(rejectButton);

          row.appendChild(checkboxCell);
          row.appendChild(nameCell);
          row.appendChild(idCell);
          row.appendChild(courseCell);
          row.appendChild(dateCell);
          row.appendChild(statusCell);
          row.appendChild(actionCell);

          tbody.appendChild(row);
        });
      })
      .catch((error) => {
        tost("Login and verify your Email", "error", 3000);
        // suspend loading screen
        loader.style.display = "none";

        console.error("Fetch error:", error);
      });
  }

  // Call the function to fetch data when the document is loaded
  fetchTAData();
});
