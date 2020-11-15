const request = require('request')
const axios = require('axios').default;
const chalk = require('chalk');
const constants = require('./constants')

const success=chalk.green;
const error=chalk.red.bold.underline;
const info = chalk.blue;

let params = {
  access_key: constants.WeatherStackAccessKey,
  query: 'Mumbai',
  units: 'm'
}


const forecast = (query,callback) => {
    let url  = 'http://api.weatherstack.com/current';
    params.query=query
    console.log(url);

    axios.get(url,{params})
    .then( response => {
    apiResponse = response.data;
    console.log(JSON.stringify(apiResponse));
    if(apiResponse.error!=undefined)
      callback(apiResponse.error,undefined);
    
    else{
      console.log("Location: "+query+"\nWeather: "+success(apiResponse.current.weather_descriptions)+". Current Temperature is "+success.inverse(apiResponse.current.temperature)+"℃  but it feels like "+info.inverse(apiResponse.current.feelslike)+"℃.\n There is "+apiResponse.current.precip*100+" % chance of rain.\n This data was observed at "+apiResponse.current.observation_time); 
      var weatherData="Location: "+query+" Weather: "+apiResponse.current.weather_descriptions+". Current Temperature is "+apiResponse.current.temperature+"℃  but it feels like "+apiResponse.current.feelslike+"℃. There is "+apiResponse.current.precip*100+" % chance of rain. This data was observed at "+apiResponse.current.observation_time;
      callback(undefined,weatherData);
    }
  })
  .catch( error => {
    console.log('Error Trace: '+JSON.stringify(error));
  })
  .then(() => {
    console.log("Good Bye!");
 })
}
module.exports= forecast;