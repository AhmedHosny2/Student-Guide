document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("select-all").addEventListener("change", function () {
    document.querySelectorAll(".select-row").forEach(function (checkbox) {
      checkbox.checked = this.checked;
    }, this);
  });


  const data = [
    {
      name: "Ahmed Yehia",
      id: 1,
      course: "CS 101",
      requestDate: "12/12/2021",
      requestStatus: "Pending",
      imgSrc: "../images/male.svg",
    },
    {
      name: "John Doe",
      id: 2,
      course: "CS 101",
      requestDate: "12/12/2021",
      requestStatus: "Approved",
      imgSrc: "../images/male.svg",
    },
    {
      name: "John Doe",
      id: 2,
      course: "CS 101",
      requestDate: "12/12/2021",
      requestStatus: "Approved",
      imgSrc: "../images/male.svg",
    },
    {
      name: "John Doe",
      id: 2,
      course: "CS 101",
      requestDate: "12/12/2021",
      requestStatus: "Approved",
      imgSrc: "../images/male.svg",
    },
    {
      name: "John Doe",
      id: 2,
      course: "CS 101",
      requestDate: "12/12/2021",
      requestStatus: "Approved",
      imgSrc: "../images/male.svg",
    },
    {
      name: "John Doe",
      id: 2,
      course: "CS 101",
      requestDate: "12/12/2021",
      requestStatus: "Approved",
      imgSrc: "../images/male.svg",
    },
    {
      name: "John Doe",
      id: 2,
      course: "CS 101",
      requestDate: "12/12/2021",
      requestStatus: "Approved",
      imgSrc: "../images/male.svg",
    },
  ];


  const tbody = document.getElementById("tbody");

  // Clear the tbody
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
    img.src = item.imgSrc;
    nameWrapper.appendChild(img);
    nameWrapper.appendChild(document.createTextNode(item.name));
    nameCell.appendChild(nameWrapper);

    const idCell = document.createElement("td");
    idCell.textContent = item.id;

    const courseCell = document.createElement("td");
    courseCell.textContent = item.course;

    const dateCell = document.createElement("td");
    dateCell.textContent = item.requestDate;

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
});
