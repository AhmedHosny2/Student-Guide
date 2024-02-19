const { configureServer } = require("./config/configServer.js");
const courseRouter = require("./routes/courseRoutes.js");
const coursePort = process.env.PORT || 5002;
configureServer(courseRouter,"/course", coursePort);
