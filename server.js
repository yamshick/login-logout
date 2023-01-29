const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const users = require("./users.json");
const app = express();

const port = process.env.PORT || 3000;

// app.use(express.static("dist"));
app.use(bodyParser.json());

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
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
    res.status(401);
    res.send(
      JSON.stringify({
        error: { message: "Имя пользователя или пароль введены неверно" },
      })
    );
  }
});

app.post("/register", function (req, res) {
  console.log(req.body);
  const { login, password } = req.body;
  let isRegisteredAlready = false;
  users.forEach((user) => {
    if (user.login === login && user.password === password) {
      isRegisteredAlready = true;
    }
  });

  if (isRegisteredAlready) {
    res.setHeader("Content-Type", "text/plain");
    res.end(
      JSON.stringify({
        error: { message: "Пользователь с таким логином уже зарегистрирован" },
      })
    );
    isRegisteredAlready = false;
  } else {
    res.send(JSON.stringify("Пользователь успешно создан"));
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
