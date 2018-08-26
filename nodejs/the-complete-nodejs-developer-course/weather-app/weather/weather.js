const request = require('request');

const apikey = '21d559c4fdaeeb86416d6f00e13eb7de';
const units = 'si';

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${apikey}/${lat},${lng}?units=${units}`,
    json: true,
  }, (error, response, body) => {
    if (body.error) {
      callback(`Error: ${body.error}`);
    } else if (!error && response.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
        precipProbability : body.currently.precipProbability
      })
    } else {
      callback(`Unable to fetch weather`);
    }
  });
};

module.exports.getWeather = getWeather;
