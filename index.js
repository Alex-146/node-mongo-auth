const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ok: true});
});

app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));
app.use("/users", require("./routes/users"));
app.use("/sample", require("./routes/sample"));

// ! https://github.com/Automattic/mongoose/issues/6890
// mongoose.set("useCreateIndex", true);

const { connectionUrl, options } = require("./config/db");

mongoose.connect(connectionUrl, options).then(value => {
  console.log("db ok");
}).catch(error => {
  console.log(error);
  console.log("db error")
});

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}...`);
});
