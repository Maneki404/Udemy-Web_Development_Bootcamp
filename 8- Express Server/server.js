const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("<h1>Home Page</h1>");
});

app.get("/contact", function (req, res) {
  res.send("Contact me at nonono@gmail.com");
});

app.get("/about", function (req, res) {
  res.send("Slave of a birb and a neko.");
});

app.get("/hobbies", function (req, res) {
  res.send("Horror");
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
