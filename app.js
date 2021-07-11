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
      const iconUrlTwo =
        "https://openweathermap.org/img/wn/" +
        days.dayTwo.weatherIcon +
        "@2x.png";
      const iconUrlThree =
        "https://openweathermap.org/img/wn/" +
        days.dayThree.weatherIcon +
        "@2x.png";
      const iconUrlFour =
        "https://openweathermap.org/img/wn/" +
        days.dayFour.weatherIcon +
        "@2x.png";
      const iconUrlFive =
        "https://openweathermap.org/img/wn/" +
        days.dayFive.weatherIcon +
        "@2x.png";
      const iconUrlSix =
        "https://openweathermap.org/img/wn/" +
        days.daySix.weatherIcon +
        "@2x.png";
      const iconUrlSeven =
        "https://openweathermap.org/img/wn/" +
        days.daySeven.weatherIcon +
        "@2x.png";
      console.log(days.dayOne.description);
      res.render("result", {
        query: enteredCityName,
        dateOne: days.dayOne.date,
        dateTwo: days.dayTwo.date,
        dateThree: days.dayThree.date,
        dateFour: days.dayFour.date,
        dateFive: days.dayFive.date,
        dateSix: days.daySix.date,
        dateSeven: days.daySeven.date,
        temp: days.dayOne.currentTemp,
        description: days.dayOne.description,
        iconUrl,
        tempTwo: days.dayTwo.maxTemp,
        descriptionTwo: days.dayTwo.description,
        iconUrlTwo,
        tempThree: days.dayThree.maxTemp,
        descriptionThree: days.dayThree.description,
        iconUrlThree,
        tempFour: days.dayFour.maxTemp,
        descriptionFour: days.dayFour.description,
        iconUrlFour,
        tempFive: days.dayFive.maxTemp,
        descriptionFive: days.dayFive.description,
        iconUrlFive,
        tempSix: days.daySix.maxTemp,
        descriptionSix: days.daySix.description,
        iconUrlSix,
        tempSeven: days.daySeven.maxTemp,
        descriptionSeven: days.daySeven.description,
        iconUrlSeven,
      });
    });
    // console.log(dayOne.description);
  });
});

app.listen(3000, () => {
  console.log("server started at " + 3000);
});
