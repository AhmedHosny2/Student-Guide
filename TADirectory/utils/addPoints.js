const userURL = require("../services/BaseURLs").USER_BASE_URL;
exports.updateUserPoints = async (userEmail, points) => {
  try {
    fetch(userURL + "/updatePoints", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userEmail,
        points,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response.data);
    });
  } catch (error) {
    console.error("Error updating user points:", error.message);
  }
};
