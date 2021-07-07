const axios = require("axios");
const opencage = require("opencage-api-client");

module.exports = async (lat, lon) => {
  try {
    // let data = await axios.get(
    //   "https://api.openweathermap.org/data/2.5/weather?q=izmir&appid=87cc56b891977c85416c370bca6506f6&units=metric"
    // );
    // const lon = "27.0923";
    // const lat = "38.4622";
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    let data = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${process.env.API_KEY}&units=metric`
    );

    // console.log(data.data.daily[1]);
    const dayOne = {
      date: new Date(
        new Date(data.data.daily[0].dt * 1000).getTime()
      ).toLocaleDateString("tr-TR", options),
      currentTemp: data.data.current.temp,
      maxTemp: data.data.daily[0].temp.max,
      minTemp: data.data.daily[0].temp.min,
      weatherIcon: data.data.daily[0].weather[0].icon,
      description: data.data.daily[0].weather[0].description,
    };
    const dayTwo = {
      date: new Date(
        new Date(data.data.daily[1].dt * 1000).getTime()
      ).toLocaleDateString("tr-TR", options),
      currentTemp: data.data.current.temp,
      maxTemp: data.data.daily[1].temp.max,
      minTemp: data.data.daily[1].temp.min,
      weatherIcon: data.data.daily[1].weather[0].icon,
      description: data.data.daily[1].weather[0].description,
    };
    const dayThree = {
      date: new Date(
        new Date(data.data.daily[2].dt * 1000).getTime()
      ).toLocaleDateString("tr-TR", options),
      currentTemp: data.data.current.temp,
      maxTemp: data.data.daily[2].temp.max,
      minTemp: data.data.daily[2].temp.min,
      weatherIcon: data.data.daily[2].weather[0].icon,
      description: data.data.daily[2].weather[0].description,
    };
    const dayFour = {
      date: new Date(
        new Date(data.data.daily[3].dt * 1000).getTime()
      ).toLocaleDateString("tr-TR", options),
      currentTemp: data.data.current.temp,
      maxTemp: data.data.daily[3].temp.max,
      minTemp: data.data.daily[3].temp.min,
      weatherIcon: data.data.daily[3].weather[0].icon,
      description: data.data.daily[3].weather[0].description,
    };
    const dayFive = {
      date: new Date(
        new Date(data.data.daily[4].dt * 1000).getTime()
      ).toLocaleDateString("tr-TR", options),
      currentTemp: data.data.current.temp,
      maxTemp: data.data.daily[4].temp.max,
      minTemp: data.data.daily[4].temp.min,
      weatherIcon: data.data.daily[4].weather[0].icon,
      description: data.data.daily[4].weather[0].description,
    };
    const daySix = {
      date: new Date(
        new Date(data.data.daily[5].dt * 1000).getTime()
      ).toLocaleDateString("tr-TR", options),
      currentTemp: data.data.current.temp,
      maxTemp: data.data.daily[5].temp.max,
      minTemp: data.data.daily[5].temp.min,
      weatherIcon: data.data.daily[5].weather[0].icon,
      description: data.data.daily[5].weather[0].description,
    };
    const daySeven = {
      date: new Date(
        new Date(data.data.daily[6].dt * 1000).getTime()
      ).toLocaleDateString("tr-TR", options),
      currentTemp: data.data.current.temp,
      maxTemp: data.data.daily[6].temp.max,
      minTemp: data.data.daily[6].temp.min,
      weatherIcon: data.data.daily[6].weather[0].icon,
      description: data.data.daily[6].weather[0].description,
    };
    // console.log(dayOne.description);
    return { dayOne, dayTwo, dayThree, dayFour, dayFive, daySix, daySeven };
  } catch (error) {
    console.error(error);
  }
};
