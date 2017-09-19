# Map Client III: Web Map Interaction

> Fall 2017 | Geography 371 | Geovisualization: Web Mapping
>
> Instructor: Bo Zhao | Location: 235 Wilkinson | Time: Wednesday 1200 to 1250

**Learning Objectives**

- Understand the basic concept of Choropleth map;
- Grasp the method to color thematic layers;
- Add more map interactions; and
- Customize map controls.

This lecture creates a colorful interactive [choropleth map](http://en.wikipedia.org/wiki/Choropleth_map) of US States Population Density with the help of [GeoJSON](http://leafletjs.com/examples/geojson/) and some custom controls.

![](img/final_map.png)

> **Note:**  A choropleth map is a thematic map in which areas are shaded or patterned in proportion to the measurement of the statistical variable being displayed on the map, such as population density or per-capita income. The choropleth map provides an easy way to visualize how a measurement varies across a geographic area or it shows the level of variability within a region.

##  1. Data source

We’ll be creating a visualization of population density per US state. As the amount of data (state shapes and the density value for each state) is not very big, the most convenient and simple way to store and then display it is [GeoJSON](http://leafletjs.com/examples/geojson/).

Each feature of our GeoJSON data ([us-states.js](assets/us-states.js)) will look like this:


```js
{
    "type": "Feature",
    "properties": {
        "name": "Oregon",
        "density": 40.33
    },
    "geometry": ...
    ...
}
```

The GeoJSON with state shapes is from [Mike Bostock](http://bost.ocks.org/mike) of [D3](http://d3js.org/), extended with density values from [US Census Bureau (2011)](http://www.census.gov/) and assigned to states data JS variable.

##  2. Basic states map

Let’s display our states data on a map with a custom Mapbox style for nice grayscale tiles that look perfect as a background for visualizations:

```js
var mapboxAccessToken = {your access token here};
var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
    attribution: ...
}).addTo(map);

L.geoJson(statesData).addTo(map);
```
![](img/states.png)

##  3. Adding some color

Now we need to color the states according to their population density. Regarding using color on web environment, please refer to [a tutorial on color at W3Schools]( http://www.w3schools.com/colors/default.asp). the Choosing nice colors for a map can be tricky, but there’s a great tool that can help with it — [ColorBrewer](http://colorbrewer2.org/). Using the values we got from it, we create a function that returns a color based on population density:

```js
function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}
```

Next we define a styling function for our GeoJSON layer so that its fillColor depends onfeature.properties.density property, also adjusting the appearance a bit and adding a nice touch with dashed stroke.

```js
function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(statesData, {style: style}).addTo(map);
```

Looks much better now!

![](img/choropleth.png)

## 4. Adding Interaction

Now let’s make the states highlighted visually in some way when they are hovered with a mouse. First we’ll define an event listener for layer mouseover event:

```js
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
```

Here we get access to the layer that was hovered through `e.target`, set a thick grey border on the layer as our highlight effect, also bringing it to the front so that the border doesn't clash with nearby states (but not for IE, Opera or Edge, since they have problems doing bringToFront on mouseover).

Next we’ll define what happens on mouseout:

```js
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}
```

The handy `geojson.resetStyle` method will reset the layer style to its default state (defined by our style function). For this to work, make sure our GeoJSON layer is accessible through the geojson variable by defining it before our listeners and assigning the layer to it later:

```js
var geojson;
// ... our listeners
geojson = L.geoJson(...);
```

As an additional touch, let’s define a click listener that zooms to the state:

```js
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
```
Now we’ll use the onEachFeature option to add the listeners on our state layers:

```js
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);
```
This makes the states highlight nicely on hover and gives us the ability to add other interactions inside our listeners.

## 5. Custom Info Control

We could use the usual popups on click to show information about different states, but we’ll choose a different route — showing it on state hover inside a custom control.

Here’s the code for our control:

```js
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Hover over a state');
};

info.addTo(map);
```

We need to update the control when the user hovers over a state, so we’ll also modify our listeners as follows:

```js
function highlightFeature(e) {
    ...
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    ...
    info.update();
}
```
The control also needs some CSS styles to look nice:

```css
.info {
    padding: 6px 8px;
    font: 14px/16px Arial, Helvetica, sans-serif;
    background: white;
    background: rgba(255,255,255,0.8);
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    border-radius: 5px;
}
.info h4 {
    margin: 0 0 5px;
    color: #777;
}
```

## 6. Custom Legend Control

Creating a control with a legend is easier, since it is static and doesn’t change on state hover. JavaScript code:

```js
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
```

CSS styles for the control (we also reuse the info class defined earlier):

```css
.legend {
    line-height: 18px;
    color: #555;
}
.legend i {
    width: 18px;
    height: 18px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
}
```
![](img/final_map.png)

## Reference

[1] Choropleth map https://en.wikipedia.org/wiki/Choropleth_map

[2] Color for styling thematic layers http://colorbrewer2.org/

[3] http://www.w3schools.com/colors/default.asp