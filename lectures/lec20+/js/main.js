var map = L.map('map', {
    zoom: 2,
    timeDimensionControl: true,
    timeDimension: true,
    timeDimensionOptions:{
        timeInterval: "1981-09/2017-02",
        period: "P1M",
        currentTime: Date.parse("1981-09-01T00:00:00Z")
    },
    center: [20.0, 0.0]
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var testWMS = "http://www.ncdc.noaa.gov/thredds/wms/OISST-V2-AVHRR_agg_combined";

var testLayer = L.tileLayer.wms(testWMS, {
    layers: 'sst',
    format: 'image/png',
    transparent: true,
    style: 'boxfill/sst_36',
    colorscalerange: '-3,35',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    attribution: '<a href="http://www.ncdc.noaa.gov">NOAAs National Climatic Data Center</a>'
});

var testTimeLayer = L.timeDimension.layer.wms(testLayer, {
    updateTimeDimension: false
});

testTimeLayer.addTo(map);

var testLegend = L.control({
    position: 'topright'
});
testLegend.onAdd = function(map) {
    var src = testWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=sst&PALETTE=sst_36&COLORSCALERANGE=-3,35";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};
testLegend.addTo(map);