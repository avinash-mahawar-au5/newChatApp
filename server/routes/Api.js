const apiRouter = require("express").Router();

apiRouter.use("/auth", require("./Auth"));
apiRouter.use("/room", require("./Rooms"));

module.exports = apiRouter;
