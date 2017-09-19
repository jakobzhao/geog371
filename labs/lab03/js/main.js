/**
 * Created by jakob on 1/2/2017.
 */

var mymap = L.map('map', {center: [44.13, -119.93], zoom: 7});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
    maxZoom: 11,
    minZoom: 6,
    attribution: 'Cell Tower Data &copy; Map Cruzin | Oregon counties &copy; Oregon Explorer | Base Map &copy; Mapbox',
    id: 'mapbox.light'
}).addTo(mymap);

// Create Custom Icons Here
var TowerIcon = L.Icon.extend({
    options:{
        shadowUrl: 'img/ct_sd.png',
        iconSize: [18,18],
        shadowSize: [25,18],
        iconAnchor: [16, 16],
        shadowAnchor: [16, 16],
        popupAnchor: [-8, -18]
    }
});

var tower1Icon = new TowerIcon({iconUrl: 'img/ct1.png'});
var tower2Icon = new TowerIcon({iconUrl: 'img/ct2.png'});
var tower3Icon = new TowerIcon({iconUrl: 'img/ct3.png'});
var tower4Icon = new TowerIcon({iconUrl: 'img/ct4.png'});
var tower5Icon = new TowerIcon({iconUrl: 'img/ct5.png'});
var tower6Icon = new TowerIcon({iconUrl: 'img/ct6.png'});
var tower7Icon = new TowerIcon({iconUrl: 'img/ct7.png'});
var tower8Icon = new TowerIcon({iconUrl: 'img/ct8.png'});
var tower9Icon = new TowerIcon({iconUrl: 'img/ct9.png'});

var cellTowers = null;

// Get GeoJSON and put on it on the map when it loads
$.getJSON("assets/cell_towers.geojson", function(data){
    // add the cell tower GeoJSON layer to the map
    cellTowers = L.geoJson(data,{
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.company);
        }, pointToLayer: function (feature, latlng) {
            var marker = null;
            if (feature.properties.company == "New Cingular"){
                marker = L.marker(latlng,{icon: tower1Icon});
            } else if (feature.properties.company == "Cello"){
                marker = L.marker(latlng,{icon: tower2Icon});
            } else if (feature.properties.company == "Hood River Cellular"){
                marker = L.marker(latlng,{icon: tower3Icon});
            } else if (feature.properties.company == "Medford Cellular"){
                marker = L.marker(latlng,{icon: tower4Icon});
            } else if (feature.properties.company == "Verizon"){
                marker = L.marker(latlng,{icon: tower5Icon});
            } else if (feature.properties.company == "Oregon RSA"){
                marker = L.marker(latlng,{icon: tower6Icon});
            } else if (feature.properties.company == "RSS Minnesota"){
                marker = L.marker(latlng,{icon: tower7Icon});
            } else if (feature.properties.company == "Salem Cellular"){
                marker = L.marker(latlng,{icon: tower8Icon});
            } else {
                marker = L.marker(latlng,{icon: tower9Icon});
            }
            return marker;
        }
    }).addTo(mymap);
});

// Set function for color ramp
function setColor(density){
    return density > 18 ? '#b30000' :
           density > 13 ? '#e34a33' :
           density > 10 ? '#fc8d59' :
           density >  5 ? '#fdcc8a' :
                          '#fef0d9';
}

// Set style function that sets fill color property equal to cell tower density
function style(feature) {
    return {
        fillColor: setColor(feature.properties.CT_CNT),
        fillOpacity: 0.2,
        weight: 2,
        opacity: 1,
        color: '#ffffff',
        dashArray: '4'
    };
}

// Null variable that will hold counties layer
var countiesLayer = null;

// Add Counties Polygons
$.getJSON("assets/counties.geojson",function(data){
    countiesLayer = L.geoJson(data, {style: style}).addTo(mymap);
});


// Create Leaflet Control Object for Legend
var legend = L.control({position: 'topright'});

// Function that runs when legend is added to map
legend.onAdd = function () {

    // Create Div Element and Populate it with HTML
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<b># Cell Tower</b><br />';
    div.innerHTML += '<i style="background: #b30000; opacity: 0.5"></i><p>19+</p>';
    div.innerHTML += '<i style="background: #e34a33; opacity: 0.5"></i><p>14-18</p>';
    div.innerHTML += '<i style="background: #fc8d59; opacity: 0.5"></i><p>11-13</p>';
    div.innerHTML += '<i style="background: #fdcc8a; opacity: 0.5"></i><p> 6-10</p>';
    div.innerHTML += '<i style="background: #fef0d9; opacity: 0.5"></i><p> 0- 5</p>';
    div.innerHTML += '<hr><b>Company<b><br />';
    div.innerHTML += '<img src="img/ct1.png"><p> New Cingular</p>';
    div.innerHTML += '<img src="img/ct2.png"><p> Cello</p>';
    div.innerHTML += '<img src="img/ct3.png"><p> Hood River Cellular</p>';
    div.innerHTML += '<img src="img/ct4.png"><p> Medford Cellular</p>';
    div.innerHTML += '<img src="img/ct5.png"><p> Verizon</p>';
    div.innerHTML += '<img src="img/ct6.png"><p> Oregon RSA</p>';
    div.innerHTML += '<img src="img/ct7.png"><p> RSS MInnesota</p>';
    div.innerHTML += '<img src="img/ct8.png"><p> Salem Cellular</p>';
    div.innerHTML += '<img src="img/ct9.png"><p> US Cellular</p>';
    // Return the Legend div containing the HTML content
    return div;
};

// Add Legend to Map
legend.addTo(mymap);

L.control.scale({position: 'bottomleft'}).addTo(mymap);