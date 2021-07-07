require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const weatherData = require("./api-request");
const axios = require("axios");
const opencage = require("opencage-api-client");
const geocode = require("./geocode");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // css için public folderı yarat
app.set("view engine", "ejs");

// weatherData.weatherData();
app.get("/", (req, res) => {
  // let returnedCity, cityAndCountry, lat, lng;

  res.render("home");
});

app.post("/", (req, res) => {
  const enteredCityName = req.body.cityName;
  if (!enteredCityName) {
    res.redirect("/");
  }

  const promise = geocode(enteredCityName); // returns city and city+country
  promise.then((city) => {
    const returnedCity = city.city;
    const cityAndCountry = city.cityAndCountry;
    const lat = city.lat;
    const lng = city.lng;
    console.log(cityAndCountry);
    weatherData(lat, lng).then((days) => {
      const iconUrl =
        "https://openweathermap.org/img/wn/" +
        days.dayOne.weatherIcon +
        "@2x.png";
      console.log(days.dayOne.description);
      res.render("result", {
        query: enteredCityName,
        temp: days.dayOne.currentTemp,
        description: days.dayOne.description,
        iconUrl: iconUrl,
      });
    });
    // console.log(dayOne.description);
  });
});

app.listen(3000, () => {
  console.log("server started at " + 3000);
});
