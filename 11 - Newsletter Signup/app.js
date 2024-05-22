const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
// const mailChimp = require("@mailchimp/mailchimp_marketing");

const app = express();
// mailChimp.setConfig({
//   apiKey: "asdasdasdasadadadsasd",
//   server: "us21",
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// async function runMailChimp() {
//   const response = await mailChimp.ping.get();
//   console.log(response);
// }

// runMailChimp();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const name = req.body.nameInput;
  const surname = req.body.surnameInput;
  const email = req.body.emailInput;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
          LNAME: surname,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/99eeb07774";
  const options = {
    method: "POST",
    auth: "fuckedUpThings475:d6e29f957732c5614d20aec72418b017-us21",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      //console.log(JSON.parse(data));
    });
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("The server is started on port 3000");
});
