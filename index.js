require("dotenv").config();
const axios = require('axios');
const express = require('express');
var http = require('http');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const accesskeyIP="02744ae4a869785d1a2a98ab4f81d09e";
const openkey=process.env.openWeatherkey;


//Api that gets the current weather of the current location
app.get('/weather', async (req,res) => {
 const params={
    lat:req.body.lat,
    lon:req.body.lon,
    APIKey:openkey
 
 };
const { data } =  await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${params.lat}&lon=${params.lon}&appid=${params.APIKey}&exclude=minutely&units=metric`,{params}).catch(error => {
  console.log(error);
});
 processWeatherData(data);
console.log(data);
return res.send(data);
});



app.get('/location', async (req,res) => {
  const { data } =  await axios.get('https://geo.ipify.org/api/v2/country,city?apiKey=at_pZdMvxABS0ZniTVyqQ9kVBbLT9QDQ');
  processLocation(data);
 return res.send(data);

});
 
function processLocation(res){
  var location=res.location.city;
  var lat=res.location.lat;
  var lng=res.location.lng;
  console.log("location:"+location);
  console.log("latitude is: "+lat);
  console.log("longitude is: "+lng);
}
function processWeatherData(response) {
  
  var timezone=response.timezone;
  var current=response.current;
  console.log("Timezone: "+timezone);

  for (var i=0;i<current.length;i++) {
    console.log("Current weather: "+current[i].temp);
  }
}



app.listen(5000);




//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York%20City%2CNY?unitGroup=us&forecastDays=5&iconSet=icons1&key=Y4CBPCTEBXA8YCPJLCFG97ZT8&contentType=json
//?locations=Cairo&forecastDays=5&iconSet=icons1&contentType=json&key=${access_key}
