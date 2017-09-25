/**
 * Created by jakob on 1/2/2017.
 */

var mymap = L.map('map', {center: [44.13, -119.93], zoom: 7});

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap);


//https://github.com/gka/chroma.js/blob/master/src/colors/colorbrewer.coffee
var colors = chroma.scale('Accent').mode('lch').colors(9);

for (i = 0; i < 9; i++) {
    $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}


// Get GeoJSON and put on it on the map when it loads
L.geoJson.ajax("assets/cell_towers.geojson", {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.company);
    },
    pointToLayer: function (feature, latlng) {
        switch (feature.properties.company) {
            case "New Cingular":
                id = 0;
                break;
            case "Cellco":
                id = 1;
                break;
            case "RCC Minnesota":
                id = 2;
                break;
            case "Verizon":
                id = 3;
                break;
            case "US Cellular":
                id = 4;
                break;
            case "Hood River Cellular":
                id = 5;
                break;
            case "Medford Cellular":
                id = 6;
                break;
            case "Oregon RSA":
                id = 7;
                break;
            default:
                id = 8;// "Salem Cellular"
        }
        return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-signal marker-color-' + (id + 1).toString() })});
    }
}).addTo(mymap);

//https://github.com/gka/chroma.js/blob/master/src/colors/colorbrewer.coffee
// Set function for color ramp
colors = chroma.scale('OrRd').mode('hsl').colors(5); //colors = chroma.scale('OrRd').colors(5);
function setColor(density) {
    flag = 0;
    switch (true) {
        case density > 18:
            flag = 4;
            break;
        case density > 13 && density <= 18:
            flag = 3;
            break;
        case density > 10 && density <= 13:
            flag = 2;
            break;
        case density > 5 &&  density <= 10:
            flag = 1;
            break;
        case density <= 5:
            flag = 0;
    }
    return colors[flag];
}


// Set style function that sets fill color property equal to cell tower density
function style(feature) {
    return {
        fillColor: setColor(feature.properties.CT_CNT),
        fillOpacity: 0.4,
        weight: 2,
        opacity: 1,
        color: '#ffffff',
        dashArray: '4'
    };
}

// Add Neighborhood Polygons
L.geoJson.ajax("assets/counties.geojson", {
    style: style
}).addTo(mymap);


// Create Leaflet Control Object for Legend
var legend = L.control({position: 'topright'});

// Function that runs when legend is added to map
legend.onAdd = function () {

    // Create Div Element and Populate it with HTML
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<b># Cell Tower</b><br />';
    div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5"></i><p>19+</p>';
    div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5"></i><p>14-18</p>';
    div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5"></i><p>11-13</p>';
    div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5"></i><p> 6-10</p>';
    div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5"></i><p> 0- 5</p>';
    div.innerHTML += '<hr><b>Company<b><br />';
    div.innerHTML += '<i class="fa fa-signal marker-color-1"></i><p> New Cingular</p>';
    div.innerHTML += '<i class="fa fa-signal marker-color-2"></i><p> Cello</p>';
    div.innerHTML += '<i class="fa fa-signal marker-color-3"></i><p> RCC Minnesota</p>';
    div.innerHTML += '<i class="fa fa-signal marker-color-4"></i><p> Verizon</p>';
    div.innerHTML += '<i class="fa fa-signal marker-color-5"></i><p> US Cellular</p>';
    div.innerHTML += '<i class="fa fa-signal marker-color-6"></i><p> Hood River Cellular</p>';
    div.innerHTML += '<i class="fa fa-signal marker-color-7"></i><p> Medford Cellular</p>';
    div.innerHTML += '<i class="fa fa-signal marker-color-8"></i><p> Oregon RSA</p>';
    div.innerHTML += '<i class="fa fa-signal marker-color-9"></i><p> Salem Cellular</p>';
    // Return the Legend div containing the HTML content
    return div;
};

// Add Legend to Map
legend.addTo(mymap);
L.control.scale({position: 'bottomleft'}).addTo(mymap);