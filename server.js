const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const height = req.body.height;
  const width = req.body.width;
  const data = req.body.data;
  const url =
    "https://chart.googleapis.com/chart?cht=qr&chs=" +
    height +
    "x" +
    width +
    "&chl=" +
    data;
  https.get(url, (response) => {
    response.on("data", (data) => {
      console.log(data);
    });
  });
});

app.listen(process.env.PORT | 3000);
