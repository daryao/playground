const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
})
.help()
.alias('help', 'h')
.argv;

geocode.geocodeAddress(argv.address, (errorMsg, geoResults) => {
  if (errorMsg) {
    console.log(errorMsg);
  } else {
    //console.log(JSON.stringify(geoResults, undefined, 2));
    const lat = geoResults.latitude;
    const lng = geoResults.longitude;
    weather.getWeather(lat, lng, (errorMsg, weatherResults) => {
      if (errorMsg) {
        console.log(errorMsg);
      } else {
        console.log(`It is currently ${weatherResults.temperature}\xB0C in ${geoResults.address}, and feels like ${weatherResults.apparentTemperature}\xB0C. The chance of rain is ${weatherResults.precipProbability*100}%.`);
      }
    });
  }
});
