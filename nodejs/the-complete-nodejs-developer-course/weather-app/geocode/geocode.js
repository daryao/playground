const request = require('request');

var geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);

  //request(options OR just url, callback)
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true,
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS'){
      callback('Unable to find address.');
    //} else if (body.results && body.results[0].geometry) {
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
  //use JSON.stringify replacer as null or undefined, it has the same result
}

module.exports.geocodeAddress = geocodeAddress;

/*
module.exports = {
  geocodeAddress
};
*/
