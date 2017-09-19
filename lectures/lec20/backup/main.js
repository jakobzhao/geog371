var map = L.map('map', {
    zoom: 4,
    fullscreenControl: true,
    timeDimension: true,
    timeDimensionOptions: {
        timeInterval: "2017-02-01/2017-02-2",
        period: "PT1H",
        currentTime: Date.parse("2017-02-01T01:00:00Z")
    },
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


var wmsUrl = "https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/export?"

var radarWMS = L.tileLayer.wms(wmsUrl, {
    layers: 'show_',
    dpi: 96,
    format: 'png8',
    transparent: true,
    opacity: 0.8,
    f: 'image',
    attribution: 'weather radar data from nowCOAST | modified by <a href="http://ceoas.oregonstate.edu/profile/zhao/">Bo Zhao</a>'
});


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