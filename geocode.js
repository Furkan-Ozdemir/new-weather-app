const opencage = require("opencage-api-client");

module.exports = async (cityName) => {
  try {
    const batch = await opencage.geocode({
      q: cityName,
      language: "en",
    });
    // console.log(batch);
    if (batch.results.length > 0)
      return {
        city: batch.results[0].components.state,
        cityAndCountry: batch.results[0].formatted,
        lat: batch.results[0].geometry.lat,
        lng: batch.results[0].geometry.lng,
      };
    //şehir
  } catch (error) {
    // console.log(JSON.stringify(data));

    console.error("error", error.message);
  }
};
