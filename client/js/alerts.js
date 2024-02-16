export function showSuccessAlert(message) {
  console.log(message);
  var successAlert = document.createElement("div");
  successAlert.className = "success-alert";
  successAlert.innerHTML = "<strong>Success:</strong> " + message;
  document.body.appendChild(successAlert);
  setTimeout(function () {
    document.body.removeChild(successAlert);
  }, 10000); // Hide after 2 seconds
}

export function showErrorAlert(message) {
  var errorAlert = document.createElement("div");
  errorAlert.className = "error-alert";
  errorAlert.innerHTML = "<strong>Error:</strong> " + message;
  document.body.appendChild(errorAlert);
  setTimeout(function () {
    document.body.removeChild(errorAlert);
  }, 2000); // Hide after 2 seconds
}
