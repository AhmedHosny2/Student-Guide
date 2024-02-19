require("dotenv").config();
const { spawn } = require("child_process");
const path = require("path");
const schedule = require("node-schedule");
const { createFolder } = require("./drive");

const origin = process.env.DB_CONNECTION;

// Specify the MongoDB URI
const mongoUri = origin;
const mongoUriRestore = process.env.BACKUP_URI;
// Get the current directory of the script
const currentDirectory = __dirname;

// Build the mongodump command
const mongodumpCommand = "mongodump";
const args = [
  `--uri=${mongoUri}`,
  "--gzip", // Add the --gzip option separately
];
const currentDate =
  new Date().getMonth() +
  1 +
  "-" +
  new Date().getDate() + //for day
  "-" +
  new Date().getFullYear();

console.log(currentDate);

// Set the output directory to the current directory
const outputDirectory = `/BackUp/BackUpAt${currentDate}`;
args.push(`--out=${outputDirectory}`);

// Spawn the mongodump process
// after every 10 seconds
// schedule.scheduleJob("*/10 * * * * *", () => {
// at midnight
schedule.scheduleJob("*/5 * * * *", () => {
  const mongodumpProcess = spawn(mongodumpCommand, args);

  // Handle events from the mongodump process
  mongodumpProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  mongodumpProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  mongodumpProcess.on("close", (code) => {
    createFolder("BackUpAt" + currentDate).then(() => {
      console.log(`mongodump process exited with code ${code}`);
    });
  });

  mongodumpProcess.on("error", (err) => {
    console.error("Failed to start mongodump process:", err);
  });
});

// restore

function restoreBackup(backupData) {
  console.log("restoring backup");
  const backUpPath = `/BackUp/BackUpAt${backupData}`;
  const mongorestoreCommand = "mongorestore";
  const argsRestore = [
    `--uri=${mongoUriRestore}`,
    `--gzip`,
    backUpPath + "/test",
  ];

  const mongorestoreProcess = spawn(mongorestoreCommand, argsRestore);

  mongorestoreProcess.stdout.on("data", (data) => {
    console.log(`mongorestore stdout: ${data}`);
  });

  mongorestoreProcess.stderr.on("data", (data) => {
    console.error(`mongorestore stderr: ${data}`);
  });

  mongorestoreProcess.on("close", (code) => {
    console.log(`mongorestore process exited with code ${code}`);
  });

  mongorestoreProcess.on("error", (err) => {
    console.error("Failed to start mongorestore process:", err);
  });
}
const data = "2-6-2024";
restoreBackup(data);
