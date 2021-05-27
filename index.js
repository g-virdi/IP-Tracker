//Getting HTML elements
const getIP = document.getElementById("ipAdressField");
const getLoaction = document.getElementById("locationField");
const getTimeZone = document.getElementById("timeZoneField");
const getISP = document.getElementById("ispField");

//API key
const geo_api_key = 'at_Bv1Nt8sx0rKdFwooe9snR5R3NZQ3v';

let latitude;
let longitude;

//Adds Map to #mapip div
var mymap = L.map('mapid', {
    center: [0, 0],
    zoom: 13,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(mymap);


//Get User Ipadress, makes new Request String & passes String to requestMaker function
fetch("https://api.ipify.org?format=json")
    .then(results => results.json())
    .then(data => {
        let requestUrl = "https://geo.ipify.org/api/v1?apiKey=" + geo_api_key + "&ipAddress=" + data.ip;
        requestMaker(requestUrl)      
}) 

//Gets value from Inputfield, creates new request String & passes String to requestMaker function
function searchLocation() {
    const getIpadress = $("#inputField").val();
    const requestUrl = "https://geo.ipify.org/api/v1?apiKey=" + geo_api_key + "&ipAddress=" + getIpadress;
    requestMaker(requestUrl)
}

//Updates map with new latitude & longitude values 
function mapUpdater(latitude, longitude) {
    mymap.panTo([latitude, longitude]);
    //Location Marker
    var marker = L.marker([latitude, longitude]).addTo(mymap);
    marker.bindPopup("IP Location").openPopup();
}

//Makes the request to API
function requestMaker(requestUrl) {
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

            mapUpdater(latitude, longitude)
        })
        .catch(error => {
            console.log(error);
            alert("Input is not an valid IP")
        })    
} 