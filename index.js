require("dotenv").config();
const axios = require('axios');
const express = require('express');
var http = require('http');
const app = express();
const bodyParser = require('body-parser')
const { json } = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//Y4CBPCTEBXA8YCPJLCFG97ZT8 visual crossing
//832e32cdeb88416bbb1143919220807 weather api
//02744ae4a869785d1a2a98ab4f81d09e ipstack

const accesskeyVC='Y4CBPCTEBXA8YCPJLCFG97ZT8';


//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York%20City%2CNY?unitGroup=us&forecastDays=5&iconSet=icons1&key=Y4CBPCTEBXA8YCPJLCFG97ZT8&contentType=json
//?locations=Cairo&forecastDays=5&iconSet=icons1&contentType=json&key=${access_key}





 
app.get('/weather', async (req,res) => {
  
const params = {
  key: accesskeyVC,
  latitude:req.body.latitude,
  longitude:req.body.longitude,
  forecastDays : '7',
  contentType : 'json',
  aggregateHours:24,
  iconSet :'icons1'
}

  const { data } =  await axios.get("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}",{params}).catch(error => {
        console.log(error);
      });
  //processWeatherData(data);

 return res.send(data);
});



  // function processWeatherData(response) {
  
  //   var location=response.resolvedAddress;
  //   var days=response.days;
  //   console.log("Location: "+location);
  //   for (var i=0;i<days.length;i++) {
  //     console.log(days[i].datetime+": tempmax="+days[i].tempmax+", tempmin="+days[i].tempmin);
  //   }
  // }
 app.get('/location', async (req,res) => {
   const { data } =  await axios.get('https://geo.ipify.org/api/v2/country,city?apiKey=at_pZdMvxABS0ZniTVyqQ9kVBbLT9QDQ');
   
  return res.send(data);
});
 












app.get('/api', async (req,res) => {

  const { data } =  await axios.get('https://api64.ipify.org?format=json');

  return res.send(data);
});










app.listen(3000);
 

  