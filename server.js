const express = require("express");
const bodyParser = require("body-parser");
const users = require("./users.json");
const app = express();
const port = 3000;

app.use(express.static("dist"));
app.use(bodyParser.json());

app.post("/login", function (req, res) {
  console.log(req.body);
  const { login, password } = req.body;
  let isLoggedInUser = null;
  users.forEach((user) => {
    if (user.login === login && user.password === password) {
      isLoggedInUser = user;
    }
  });

  if (isLoggedInUser) {
    res.setHeader("Content-Type", "text/plain");
    res.end(JSON.stringify({ name: isLoggedInUser.name }));
    isLoggedInUser = null;
  } else {
    res.send("POST request to the register");
  }
});

app.post("/register", function (req, res) {
  console.log(req);
  res.send("POST request to the register");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
