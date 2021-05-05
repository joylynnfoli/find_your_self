require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const sequelize = require("./db");
const user = require("./controllers/usercontroller");
const topics = require("./controllers/topicscontroller");
const comment = require("./controllers/commentcontroller");

sequelize.sync();
// sequelize.sync({ force: true });

app.use(express.json());

app.use(require("./middleware/headers"));

app.use("/user", user);
app.use(cors())
app.use(require("./middleware/validate-session"));
app.use("/topics", topics);
app.use("/comment", comment);

app.listen(process.env.PORT, function () {
  console.log(`App is listening on port ${process.env.PORT}`);
});
