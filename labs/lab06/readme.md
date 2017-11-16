# Practical Exercise 6: 3D Thematic Map using a Virtual Globe

> Winter 2017 | Geography 371 | Geovisualization: Web Mapping
>
> Instructor: Bo Zhao  Location: 210 Wilkinson | Time: Thursday 1000 to 1150
>
> Assigned: 03/09/2017 | Due: `11/21/2017 @11:59pm` | Points Available = 50

During the last week, we have learned how to use a virtual globe to make a 3D thematic map. To do that, some of the most frequently used virtual globe libraries are [three.js](https://threejs.org/) and [cesium.js](http://cesiumjs.org/). While three.js is more compatible with other 3D web applications, cesium.js is dedicated to make virtual globes. As introduced in the lectures, [TerriaJS](http://terria.io/) is an robust open-source geospatial platform built on cesium.js. It provides us with handy tools for navigating, editing and managing geospatial data. If you are interested in using cesium.js for an integrated web mapping application, I would highly recommend writing the codes of [TerriaJS](http://terria.io/) at GitHub. In this lab, you are asked to make a 3D thematic map using cesium.js. The major learning goal is not to have you grasp the state-of-art skills in 3D mapping. Instead, this lab prepares you with fundamental skills of making a 3D thematic map, and provides you an opportunity to reflect on the differences between 2D and 3D web mapping. Okay, let us get started.

In New York City, the local government maintains an open data portal to share a lot of datasets about the city management and administration. Among all the datasets, the 3-1-1 Calls on noise complaints are openly accessible. Since each complaint record comes with locational information, it is possible to visualize them collectively on a web map. In this practical exercise, we will make a 3D bar map to visualize the concentrations of noise complaints in the city. The final web map, as shown below, can be viewed at [http://geoviz.ceoas.oregonstate.edu/geog371/labs/lab06/index.html](http://geoviz.ceoas.oregonstate.edu/geog371/labs/lab06/index.html).

![](img/finalmap.png)

In the map, each bar indicates a number of noise complaint cases from the region underneath. Each region is a square grid with a side of 0.2 miles. The number of complaint cases is illustrated both through the sequential color scheme (low=yellow, high=red) and through the bar heights. To make such a 3D thematic map, we will need to

- Select cesium.js as the map client library;
- Use the dark theme map from MapBox as the basemap; and 
- Import the georeferenced bars in geojson data format and visualize them.

## 1\. Preparation


![](img/repository.png)

The source code is located at [labs/lab06](readme.md). The file structure of this repository looks like the file tree below:

```powershell
noise_complaints
    labs/lab06/
    ├─assets
    ├  ├─── nyc_noise.geojson
    ├─css
    ├  ├─── style.css
    ├─img
    ├  ├─── ...
    ├─index.html
    ├─readme.md
```

## 2\. HTML template

Above all, we will create an html page and include the necessary libraries. As shown, within the `body` div, we place two div elements - one for anchoring the virtual globe container and one for anchoring the legend. In addition, the style sheet locates at `css/style.css`. In order to make the application more light-weight, we use external links to include cesium libraries from [http://cesiumjs.org/releases/1.39/Build/Cesium/Cesium.js](http://cesiumjs.org/releases/1.39/Build/Cesium/Cesium.js) and [http://cesiumjs.org/releases/1.39/Build/Cesium/Widgets/widgets.css](http://cesiumjs.org/releases/1.39/Build/Cesium/Widgets/widgets.css). In order to create a color scheme dynamically, we use chroma.js.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cesiumjs.org/releases/1.39/Build/Cesium/Widgets/widgets.css">
    <link href="https://fonts.googleapis.com/css?family=Lobster|Open+Sans" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://cesiumjs.org/releases/1.39/Build/Cesium/Cesium.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chroma-js/1.3.4/chroma.min.js"></script>
    <title> Noise Complaints in New York City (Jan. to Mar. 2017)</title>
</head>
<body>
<div id="cesiumContainer"></div>
<div class="legend"></div>
</body>
</html>
```

Then, we create a `script` div to hold the javascript code. In the script, we begin with declaring the viewer. To help the users focus the web map, we turn off most of the extra features of a `Cesium.Viewer`.

```javascript
//create a cesium view, and use the mapbox dark map as the base map.
var viewer = new Cesium.Viewer('cesiumContainer', {
  ...
  vrButton: false,  // virtual reality support
  infoBox: false, // pick a feature and show its attributes
  sceneModePicker: false, // 2d, 2.5d and 3d
  navigationHelpButton: false,
  baseLayerPicker : false,
  fullscreenButton: false,
  geocoder: false,
  homeButton: false,
  animation: false,
  timeline: false
});
```

To help the thematic map stand out on a virtual globe, we change the base map by changing the **Imagery Provider** to `mapbox.dark`.

```javascript
var viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider : new Cesium.MapboxImageryProvider({
    mapId : 'mapbox.dark',
    accessToken : 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpenh0dG41ZjAyY3gzMXFsdTJqbm5oNmwifQ.ucAGT19EfvxX2EUaHUwAxA'
  }),
   ...
});
```

## 3\. Loading GeoJson data

Then we will load the geojson data and add it to the viewer object. After the data is added, we need to move the viewer by the `zoomTo` function.

The geojson data is stored in `assets/nyc_noise.geojson`, to load and post-process the data, we use the `Cesium.GeoJsonDataSource.load().then()` functions to make sure the data will only be processed after the geojson data is loaded. Then, we switch the map view to see the boundary of the geojson data using the `zoomTo` function.

```javascript
var dataSource = Cesium.GeoJsonDataSource.load('assets/nyc_noise.geojson').then(
  function(dataSource) {
    viewer.dataSources.add(dataSource);
    viewer.zoomTo(dataSource);
  }
);
```

Here, the file **nyc_noise.geojson** contains a set of polygons (circles). Each polygon contains two properties - `id` and `cnt`.

- `id` is a unique identification number; and
- `cnt` indicates the number of noise complaints that came from that region. Please try to validate the geojson data from [geojson.io](file:///C:/Users/Andy/Downloads/geojson.io)

![](img/geojsonio.png)

Once the cesium successfully imports the geojson data, we will symbolize the polygons. 

![](img/geojson_loaded.png)

First, we put all the entities in that geojson file in a loop.

```javascript
var dataSource = Cesium.GeoJsonDataSource.load('assets/nyc_noise.geojson').then(
  function(dataSource) {

    var p = dataSource.entities.values;

    for (var i = 0; i < p.length; i++) {
      ...
    }

    viewer.dataSources.add(dataSource);
    viewer.zoomTo(dataSource);
  }
);
```

For each of the entities, we want to de-visualize the outlines and extrude the entities based on the number of complaints. To set up the proper height, it is a matter of adjustment to find the right variable. Try
different values to find the best fit. In the end, we will choose *`complaint_number * complaint_number  * 0.004`*.

```javascript
p[i].polygon.outline = false;
p[i].polygon.extrudedHeight = p[i].properties.cnt * p[i].properties.cnt * 0.004;
```

![](img/geojson_height.png)

Also, we will update the color of entities using a sequential color ramp. To do that, we open the geojson data in QGIS.

![](img/qgis.png)

After classifying the entities, we will pick a color ramp. We’ll use a yellow to red sequential color ramp to visualize the data. This color ramp provides a useful visualization of how the noise volume increases
from low to high. 

![](img/color-value.png)

> **Note:** In addition to QGIS, we can also choose a color ramp from [colorbrewer2.org](colorbrewer2.org).

Cesium has a complicated [color system](http://cesiumjs.org/releases/b30/Build/Documentation/Color.html), to be simple, we use the hexadecimal color which was mainly used in CSS. Here is the API for processing a hexadecimal color.

> **Color.fromCssColorString**: Creates a Color instance from a CSS color value.
>

| Name    | Type   | Description                              |
| ------- | ------ | ---------------------------------------- |
| `color` | String | The CSS color value in #rgb, #rrggbb, rgb(), rgba(), hsl(), or hsla() format. |

> **Returns:** The color object, or undefined if the string was not a valid CSS color.

Now, we make a function to determine the color based on the input number of noise complaints. Chroma.js is used to create the color array.

```javascript
// determine the number of classes and their respective break values.
var grades = [150, 260, 400, 650, 1200];

// determine the color.md ramp. The number of colors is determined by the number of classes.
// try different interpolation method lch, lab, hsl
var colors = chroma.scale(['yellow', 'navy']).mode('hsl').colors(grades.length);
//var colors = chroma.scale('YlOrRd').colors(grades.length);

// create the legend
var labels = [];


// set the color.md based on the class which the input value falls in.
function setColor(d) {
    for (var j = 0; j < grades.length - 1; j++) {
        if ( d >= grades[j] && d < grades[j+1] ) return colors[j];
    }
    if (d >= grades[grades.length - 1]) return colors[grades.length -1];
}
```

Then, we can easily update the material parameter of each entity using the `setColor` function as shown below:

```javascript
p[i].polygon.material = Cesium.Color.fromCssColorString(setColor(p[i].properties.cnt));
```

## 4\. Panel of Description and Legend

Now, a 3D thematic map is made! In order to help users to read this map, we will add a legend and some descriptions. The approach to adding a legend has been already introduced in the map client series and
practiced in PE 3. In general, we will put the content in a `div` and then capture the div using the class name, and style it by css stylesheet. Here, the class of the legend div is `legend`, as shown below.

```html
<div class="legend">
    <h4> Noise Complaints in New York City </h4>
    <p><b> # Noise Complaints (Jan. to Mar. 2017) </b></p><br/>
    <div id="patches"></div><br/>
    ...
</div>
```

And the stylesheet is.

```css
.legend {
    line-height: 16px;
    width: 280px;
    position: absolute;
    z-index: 1000;
    left: 10px;
    bottom: 10px;
    color: #a0a0a0;
    font-family: 'Open Sans', sans-serif;
    padding: 6px 8px;
    background: rgba(38, 38, 38, 0.5);
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    border-radius: 5px;
}

h4 {
    font-family:  Lobster, cursive;
    font-size: larger;
}

.legend i {
    width: 16px;
    height: 16px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
}

.legend p {
    font-size: 12px;
    line-height: 16px;
    margin: 0;
}
```

And use Jquery to insert legend patches to the legend panel.
```javascript
for (var i = 0; i < grades.length - 1; i++) {
    labels.push('<i style="background:' + colors[i] + '"></i> <p>' + grades[i] + ' - ' + (grades[i + 1] + 1).toString() + '</p>');
}
labels.push('<i style="background:' + colors[grades.length - 1] + '"></i> <p>' + (grades[grades.length - 1] +1 ).toString() + ' +' + '</p>');
$("#patches").html(labels.join(''));
```

Someone may find the default cesium.js credit banner is kind of distracting. We can actually turn it off using the following code:

![](img/original_credits.png)

```javascript
document.getElementsByClassName("cesium-widget-credits")[0].style.visibility = "hidden";
```

In addition to the legend, you can add on more descriptive information about this web map. I added a title in the lobster font (which I really like), a short paragraph describing the map, and the proper credits.

```html
<div class="legend">
    <h4> Noise Complaints in New York City </h4>
    <p><b> # Noise Complaints (Jan. to Mar. 2017) </b></p><br/>
    <div id="patches"></div><br/>
    <p> This 3D thematic map shows the number of noise complaints in New York City according to all the 3-1-1 Service requests from January to March, 2017. The data was directly downloaded from <a href="https://data.cityofnewyork.us/Social-Services/Noise-complaints-since-20151101-w-Unspecified-CB/vjav-8yz5">NYC OpenData</a>. In the United States, 3-1-1 is a special telephone number that provides access to non-emergency municipal services.</p><br/>
    <p> Virtual globe Lib: cesium.js | BaseMap: Mapbox | Noise Reports: NYC OpenData </p>
    <p> Author: <a href="http://ceoas.oregonstate.edu/profile/zhao/">Bo Zhao </a>|  Oregon State University</p>
</div>
```

![](img/panel.png)

If everything works smoothly, you will see a 3D web map like this. Well done!

![](img/finalmap.png)

## 5\. Deliverable

For deliverable, you will need to create a 3d thematic map similiar to the one I show above. You will need to
- Create a repository on github to host this 3d thematic map application.
- Use another basemap instead of the current mapbox dark basemap. (**10 POINTS**)
- Change the color ramp of the entities. (**15 POINTS**)
- An updated version of the credits. ***Remember, only credit your portion of the work.*** (**10 POINTS**)
- In the `readme.md` file, please answer the following question with real cases. - From an application perspective, what scenario do you think is more appropriate to use a 2D web map (e.g., leaflet), and is more appropriate to use a 3D virtual globe? For example, you can find some web mapping applications, and compare why they selected a 2D or 3D layout.  (**15 POINTS**)

The structure of your github repository should like something below.

```Powershell
[Submission_Lab_05]
│   readme.md
│   index.html
├─assets
├─js
├─css
├─img
```


Once you complete this lab assignment, please make sure both the github repository and the web site work appropriately. Then, you will need to submit the url of the GitHub repository to **Canvas Dropbox**. (On the assignment tab,  press the `Submit Assignment` button to submit. Please contact the instructor or TA if you have any difficulty.)

## References

[1]. https://data.cityofnewyork.us/Social-Services/Noise-SRs-since-20151101/fqi4-uxkk

[2]. http://cesiumjs.org/releases/b30/Build/Documentation/Color.html