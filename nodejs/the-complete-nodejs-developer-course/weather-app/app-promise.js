const yargs = require('yargs');
const axios = require('axios');

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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`
var address;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find the address');
  }
  const lat = response.data.results[0].geometry.location.lat;
  const lng = response.data.results[0].geometry.location.lng;
  const apikey = '21d559c4fdaeeb86416d6f00e13eb7de';
  const units = 'si';
  var weatherUrl = `https://api.darksky.net/forecast/${apikey}/${lat},${lng}?units=${units}`;
  address = response.data.results[0].formatted_address;
  console.log(address);
  return axios.get(weatherUrl);
}).then((response) => {
  const temperature = response.data.currently.temperature;
  const apparentTemperature = response.data.currently.apparentTemperature;
  const precipProbability = response.data.currently.precipProbability;
  console.log(`It is currently ${temperature}\xB0C in ${address}, and feels like ${apparentTemperature}\xB0C. The chance of rain is ${precipProbability*100}%.`);
}).catch((error) => {
  if (error.code === 'ENOTFOUND') {
    console.log('Unable to connect to API service');
  } else {
    console.log(error.message);
  }
});
