const { google } = require("googleapis");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const cleintId = process.env.GOOGLE_DRIVE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI;
const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;

// init oauth client
const oauth2Client = new google.auth.OAuth2(
  cleintId,
  clientSecret,
  redirectUri
);

// set refresh token
oauth2Client.setCredentials({
  refresh_token: refreshToken,
});

// create drive instance
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

exports.createFolder = async (folderName) => {
  try {
    const folderPath = path.join(__dirname, folderName + "/SEProjectDB"); // Replace 'your_folder' with the name of your folder

    const response = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
      },
    });

    const folderId = response.data.id;
    console.log(`Created folder with ID: ${folderId}`);
    uploadFiles(folderId, folderPath);
  } catch (error) {
    console.log(error.message);
  }
};

const uploadFiles = async (folderId, folderPath) => {
  try {
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);

      const response = await drive.files.create({
        requestBody: {
          name: file,
          parents: [folderId], // Set the parent folder ID
        },
        media: {
          mimeType: "application/octet-stream",
          body: fs.createReadStream(filePath),
        },
      });

      console.log(`Uploaded file: ${file} with ID: ${response.data.id}`);
    }
  } catch (error) {
    console.log(error.message);
  }
};
