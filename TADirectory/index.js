const { configureServer } = require("./config/configServer.js");
const TADirectoryRouter = require("./routes/TADirectory.js");
const TADirectoryPort = process.env.PORT || 5003;
configureServer(TADirectoryRouter, "/TADirectory",TADirectoryPort);
