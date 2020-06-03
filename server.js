const express = require('express');
const fetch =  require('node-fetch');
const Datastore = require("nedb");
require('dotenv').config();





const app = express();
const port = process.env.PORT || 3000;
app.listen(port);
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}))

const database =  new Datastore('database.db');
database.loadDatabase();

app.get('/api', (req,res) => {
  database.find({}, (err, data) => {
    if (err){
     res.end();
     return;
    }
    res.json(data) 
  });
});
app.post('/api', function (req, res) {
    
  console.log("  Got a POST request");
  const info = req.body;


  const timestamp =  Date.now();
  info.timestamp = timestamp;
 
  database.insert(info)
  res.json(info);
  
});

app.get('/weather/:latlon', async (req, res)=>{
   
    
    const latlon = req.params.latlon.split(',');
    const temp_lat = latlon[0];
    const temp = temp_lat.split('');

    
    temp.shift();
   
    const lat = temp.join('');
    
    const lon = latlon[1];
    const apiKey = process.env.API_KEY;
 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
     

      const response  = await fetch(apiUrl);
      const data  = await  response.json();
      res.json(data);
     
      
});

