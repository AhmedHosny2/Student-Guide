function animateAlert(message, duration) {
  const alertDiv = document.createElement("div");
  alertDiv.textContent = message;
  alertDiv.style.position = "fixed";
  alertDiv.style.top = "10px";
  alertDiv.style.left = "50%";
  alertDiv.style.transform = "translateX(-50%)";
  alertDiv.style.backgroundColor = "lightgreen"; // Green background
  alertDiv.style.color = "green"; // Green text color
  alertDiv.style.padding = "10px";
  alertDiv.style.border = "1px solid #008000"; // Green border
  alertDiv.style.borderRadius = "5px";
  alertDiv.style.textAlign = "center";
  alertDiv.style.opacity = 0;
  alertDiv.style.transition = "opacity 0.5s ease-in-out";

  document.body.appendChild(alertDiv);

  setTimeout(function () {
    alertDiv.style.opacity = 1;
  }, 10); // Delay for a smooth appearance

  setTimeout(function () {
    alertDiv.style.opacity = 0;
    setTimeout(function () {
      document.body.removeChild(alertDiv);
    }, 500); // Remove the alert after the fade-out animation
  }, duration);
}

function animateFailureAlert(message, duration) {
  const alertDiv = document.createElement("div");
  alertDiv.textContent = message;
  alertDiv.style.position = "fixed";
  alertDiv.style.top = "10px";
  alertDiv.style.left = "50%";
  alertDiv.style.transform = "translateX(-50%)";
  alertDiv.style.backgroundColor = "lightcoral"; // Red background
  alertDiv.style.color = "red"; // Red text color
  alertDiv.style.padding = "10px";
  alertDiv.style.border = "1px solid #FF0000"; // Red border
  alertDiv.style.borderRadius = "5px";
  alertDiv.style.textAlign = "center";
  alertDiv.style.opacity = 0;
  alertDiv.style.transition = "opacity 0.5s ease-in-out";

  document.body.appendChild(alertDiv);

  setTimeout(function () {
    alertDiv.style.opacity = 1;
  }, 10); // Delay for a smooth appearance

  setTimeout(function () {
    alertDiv.style.opacity = 0;
    setTimeout(function () {
      document.body.removeChild(alertDiv);
    }, 500); // Remove the alert after the fade-out animation
  }, duration);
}
