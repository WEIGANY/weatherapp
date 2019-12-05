const _wundergroundURL = 'https://samples.openweathermap.org/data/2.5/weather?';
const _APIKEY = 'b6907d289e10d714a6e88b30761fae22';//'51edc2bcc47cc79b06906f2f3aa418e4'; // Get your api key from https://www.wunderground.com/weather/api/
const axios = require('axios');

export function weatherApi(query) {
  console.log("start query");
  let url = `${_wundergroundURL}q=${query},uk&appid=${_APIKEY}`;
  url = `https://cors-anywhere.herokuapp.com/${url}`;
  return axios.get(url)
  // .then(response => response.json())
  .then(json => {
    console.log("start test");
    console.log(json.data);
    var x = JSON.parse(JSON.stringify(json.data));
    console.log(x);
    return x;
  });
}