if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition( async position => {
      lat = position.coords.latitude.toFixed(2);
      lon = position.coords.longitude.toFixed(2);
      // console.log(lat, lon);
      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = lon;
        
      const apiUrl = `/weather/:${lat},${lon}`

      const response  = await fetch(apiUrl);
      const json  = await response.json();
      // console.log (json);
     
      document.getElementById('description').innerText =json.weather[0].description;
      document.getElementById('temp').innerText=parseFloat(json.main.temp -273).toFixed(2);


      const weatherInfo ={  weather: json.weather[0].description,
        temp: parseFloat(json.main.temp -273).toFixed(2),
      country: json.sys.country,
    area: json.name }    
      const data = { lat, lon, weatherInfo};
       
          
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      
      
      const waeatherResponse = await fetch('/api', options);
      const weather_json = await waeatherResponse.json();
    
    });}
      

  else 
    console.log('geolocation not available');
    document.getElementById("submit").addEventListener('click',()=>{alert('Successfully checked in. Click on view check in to view your chekin in.')})

  

