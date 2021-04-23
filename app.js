require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./db");
const user = require("./controllers/usercontroller");
const library = require("./controllers/librarycontroller");
const comment = require("./controllers/commentcontroller");

sequelize.sync();
// sequelize.sync({ force: true });

app.use(express.json());

app.use(require("./middleware/headers"));

app.use("/user", user);

app.use(require("./middleware/validate-session"));
app.use("/library", library);
app.use("/comment", comment);

app.listen(process.env.PORT, function () {
  console.log(`App is listening on port ${process.env.PORT}`);
});
