var map = L.map('map', {
    zoom: 4,
    fullscreenControl: true,
    timeDimension: true,
    timeDimensionControl: true,
    timeDimensionControlOptions: {
        autoPlay: false,
        playerOptions: {
            buffer: 10,
            transitionTime: 250,
            loop: true
        }
    },
    center: [38.0, -98.50],
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//var wmsUrl = "http://new.nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer"
//var wmsUrl = "https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer"
var wmsUrl = "https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer?";
var radarWMS = L.nonTiledLayer.wms(wmsUrl, {
    layers: 'show_',
    format: 'image/png',
    transparent: true,
    opacity: 0.8,
    attribution: 'nowCOAST',
});


// layers: 'show_',
//     dpi: 96,
//     format: 'png8',
//     transparent: true,
//     opacity: 0.8,
//     f: 'image',


var timeLayer = L.timeDimension.layer.wms(radarWMS, {
    updateTimeDimension: true
});

timeLayer.addTo(map);

var legend = L.control({
    position: 'topright'
});

legend.onAdd = function(map) {
    var src = "img/radar.png";
    var div = L.DomUtil.create('div', 'info legend');
    div.style.width = '290px';
    div.style.height = '50px';
    div.innerHTML += '<b>Legend</b><br><img src="' + src + '" alt="legend">';
    return div;
};

legend.addTo(map);