
window.onload = function() {
  let tableIds = ["1", "2", "3", "4", "5", "6", "7"];
  for (let i = 0; i < tableIds.length; i++) {
    let table = document.getElementById(tableIds[i]);
    table.style.display = "none";
  }
}


document
  .getElementById("tableSelect")
  .addEventListener("change", function () {
    let tableIds = ["1", "2", "3", "4", "5", "6", "7"];
    for (let i = 0; i < tableIds.length; i++) {
      let table = document.getElementById(tableIds[i]);
      table.style.opacity = 0;
      table.style.display = "none";
    }
    let selectedTable = document.getElementById(this.value);
    selectedTable.style.display = "flex";
    setTimeout(function () {
      selectedTable.style.opacity = 1;
    }, 50);
  });