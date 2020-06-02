const mymap = L.map('checkinMap').setView([0,0], 1);
const attribution =
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);



getData();

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();
  console.log(data);
  
  for (item of data) {
    const  marker = L.marker([item.lat, item.lon]).addTo(mymap);
    const txt = `Weather here is ${item.weatherInfo.weather} with a temperature ${item.weatherInfo.temp}°C`
    marker.bindPopup(txt);
}

}



// ------------------------FOR VIEWING DATA BASE ITEM IN TEXT FORMAT------------------------------------------ 

//   for (item of data) {
//     const root = document.createElement('p');
//     const weather = document.createElement('div');
//     const geo = document.createElement('div');
//     const date = document.createElement('div');
//     const temp = document.createElement('div');
//     const country = document.createElement('div');
//     const area = document.createElement('div');

//    weather.style = "font-family:'Satisfy'; font-size: 20px";
//     weather.textContent = `Weather: ${item.weatherInfo.weather}`;
//     geo.style = "font-family:'Play'; font-size: 15px";
//     geo.textContent = `Latitude: ${item.lat}°, Longitude : ${item.lon}°`;
    
//     const dateString = new Date(item.timestamp).toLocaleString();
//     date.style = "font-family: 'Play"
//     date.textContent = `Time : ${dateString}`;

//     temp.textContent = `Temperature : ${item.weatherInfo.temp}°C`;

//     country.textContent = `Country code : ${item.weatherInfo.country}`;
//     area.textContent = `Area : ${item.weatherInfo.area}`;
//    country.style = "font-family:'Economica'; font-size: 20px";
//    area.style = "font-family:'Economica'; font-size: 20px";
//    temp.style = "font-family:'Play'; font-size: 20px"; 

//     root.append( geo, country, area, date, weather, temp );
//     document.body.append(root);
//   }

