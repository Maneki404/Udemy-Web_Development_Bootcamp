const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const appID = "f64e02e47a2e71b3e7e6ffd2ab57213d";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    appID +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data); //stringify for js object to JSON string
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degrees Celcius.</h1>"
      );
      res.write("<p>The weather is currently " + description + "</p>");
      res.write(
        "<img src=https://openweathermap.org/img/wn/" + icon + "@2x.png>"
      );
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
