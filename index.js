//Getting HTML elements
const getIP = document.getElementById("ipAdressField");
const getLoaction = document.getElementById("locationField");
const getTimeZone = document.getElementById("timeZoneField");
const getISP = document.getElementById("ispField");

//API key
const geo_api_key = 'at_Bv1Nt8sx0rKdFwooe9snR5R3NZQ3v';


let latitude;
let longitude;

/*Get User Ipadress
fetch("https://api.ipify.org?format=json")
    .then(results => results.json())
    .then(data => {
           console.log(data.ip);
           
}) */

var mymap = L.map('mapid').setView([50.1109, 8.6821], 13);
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);

function updateMap(latitude, longitude) {
    //Updates Map
    mymap.panTo([latitude, longitude]);
    //Location Marker
    var marker = L.marker([latitude, longitude]).addTo(mymap);
    marker.bindPopup("IP Location").openPopup();
}


function searchLocation() {
    var getIpadress = $("#inputField").val();
    let requestUrl = "https://geo.ipify.org/api/v1?apiKey=" + geo_api_key + "&ipAddress=" + getIpadress;
    fetch(requestUrl)
        .then(results => results.json())
        .then((data) => {
            console.log(data);
            getIP.innerHTML = data.ip;
            getLoaction.innerHTML = data.location.city;
            getTimeZone.innerHTML = "UTC " + data.location.timezone;
            getISP.innerHTML = data.isp;

            latitude = data.location.lat;
            longitude = data.location.lng;

            updateMap(latitude, longitude);
            
        })
        .catch(error => {
            console.log(error);
            alert("Input is not an valid IP")
        })
}

