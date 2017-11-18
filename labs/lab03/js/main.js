/**
 * Created by jakob on 1/2/2017.
 */

var mymap = L.map('map', {center: [44.13, -119.93], zoom: 7});

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    maxZoom: 11,
    minZoom: 6,
    detectRetina: true, //support Retina Display if the client uses high resolution monitor.
    attribution: 'Cell Tower Data &copy; Map Cruzin | Oregon counties &copy; Oregon Explorer | Base Map &copy; CartoDB'
}).addTo(mymap);


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
        var id = 0;
        if (feature.properties.company == "New Cingular") { id = 0; }
        else if (feature.properties.company == "Cellco")  { id = 1; }
        else if (feature.properties.company == "RCC Minnesota")  { id = 2; }
        else if (feature.properties.company == "Verizon")  { id = 3; }
        else if (feature.properties.company == "US Cellular")  { id = 4; }
        else if (feature.properties.company == "Hood River Cellular")  { id = 5; }
        else if (feature.properties.company == "Medford Cellular")  { id = 6; }
        else if (feature.properties.company == "Oregon RSA")  { id = 7; }
        else { id = 8;} // "Salem Cellular"
        return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-signal marker-color-' + (id + 1).toString() })});
    }
}).addTo(mymap);

//https://github.com/gka/chroma.js/blob/master/src/colors/colorbrewer.coffee
// Set function for color ramp
colors = chroma.scale('OrRd').mode('hsl').colors(5); //colors = chroma.scale('OrRd').colors(5);
function setColor(density) {
    var id = 0;
    if (density > 18) { id = 4; }
    else if (density > 13 && density <= 18) { id = 3; }
    else if (density > 10 && density <= 13) { id = 2; }
    else if (density > 5 &&  density <= 10) { id = 1; }
    else  { id = 0; }
    return colors[id];
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

// Add counties polygons
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

// Add a legend to map
legend.addTo(mymap);

// Add a scale bar to map
L.control.scale({position: 'bottomleft'}).addTo(mymap);