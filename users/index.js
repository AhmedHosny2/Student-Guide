const { configureServer } = require("./config/configServer.js");
const userRouter = require("./routes/user.js");
const userPort = process.env.PORT || 5001;
configureServer(userRouter, "/user",userPort);