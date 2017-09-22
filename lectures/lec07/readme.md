# Map Client I: Basics and Geographic Features

> Fall 2017 | Geography 371 | Geovisualization: Web Mapping
>
> **Instructor:** Bo Zhao | **Location:** WLKN 235 | **Time:** MWF 1200 - 1250

**Learning Objectives**

- Get to know the most popular web map client library/framework - Leaflet;
- Use Leaflet to create a map, geographic feature;
- Link external javascript libs to a web map application; and
- Add geospatial data to a leaflet based map.

In this lecture, we move forward to make a web map from scratch! To do that, this lecture starts with introducing Leaflet - a Javascript library used to create interactive, web-based, mobile-friendly maps. With Leaflet, you can create a simple map in as little as three lines of code, or you can build complex, dynamic, and complex maps that contain hundreds of lines. This lecture assumes you have worked through the previous lectures and lab exercises, and have a working knowledge of HTML, CSS and JavaScript.

## 1. Introduction


### 1.1 What is Leaflet?

Leaflet is an open-source JavaScript library for interactive web maps. It's lightweight, simple, and flexible, and is probably the most popular open-source mapping library at the moment. Leaflet is developed by Vladimir Agafonkin (currently of MapBox) and other contributors.

What Leaflet does web maps with tiled base layers, panning and zooming, and feature layers that you supply. It handles various basic tasks like converting data to map layers and mouse interactions, and it's easy to extend with plugins. It will also work well across most types of devices. 

What Leaflet does not do: Provide any data for you! Leaflet is a framework for showing and interacting with map data, but it's up to you to provide that data, including a basemap. Leaflet is also not GIS, although it can be combined with tools like **ArcGIS**, **MapBox**, or **CartoDB** for GIS-like capabilities.
- *If you need total freedom of form, interaction, transitions, and map projections, consider working with something like D3.*
- *If -you need word with 3D virtual globe, cesium is alternative.*

We will start with an empty webpage, then progressively add components to make a Leaflet map. It assumes a basic knowledge of HTML and JavaScript, or at the very least assumes the will to tinker with the code to better understand what it does. It won't explain every little object or array, but will contain plenty of links. Many code blocks will show only a snippet of code, highlighting the changes over previous examples. Click the "View this example on its own" link underneath a map to see complete code. For thorough documentation, see the Leaflet site.

### 1.2 Use an IDE (Webstorm) and start up a Server

To put your map on the web, you need to host the web page and geospatial data to the server. So, you need to transfer the web pages and data to the remote server (e.g., Google cloud platform) or to set up the local computer as a server. Regarding setting up a local server, you can try Webstorm debugging/execution environment or python SimpleHTTPServer, such as:

```bash
$ python -m SimpleHTTPServer
```

Now open a browser and access your site at: http://localhost:8000

## 2. Create a Webpage and Simple Map

We will start from scratch to build a web map, with a tile base layer, some mapped data, and some basic interactivity. 

![](img/polygon.jpg)

### 2.1 Create a working directory

Our first step is create a working directory. And then unzip and place the course material package (`package.zip`) to this working directory. This directory stores all of the files associated with our specific web page and web map. Next, please activate a web server as described in **section 1.3**.

If you don't have access to a web folder or server, you can set up a local development environment that mimics a web server on your own machine. This is called a **localhost server**. In this exercise, a simple Python localhost server will do. 

### 2.2 Setup a web page for our map

Open up your IDE, and then we set up an empty **index.html** template for our web page that will contain our web map and web map elements. The components will be the same as always, note the head, title, and body.

Enter the following code into your blank HTML page.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Leaflet Map</title>
</head>
<body>
    <!-- Our web map and content will go here -->
</body>
</html>
```
From here, we will do the following four things to add a map to our page:

- Reference the Leaflet CSS and JavaScript files.
- Add a div element to our page that will hold the map.
- Create a map object in Javascript that will interact with the map div element
- Add the tiled OpenStreetMap basemap to our map object using tileLayer

### 2.3 Reference the Leaflet CSS and JavaScript files

We need to load Leaflet into our web page before we can start using the library. There are two options for doing this, we can download the library files from the Leaflet download site, or we can use the hosted version. We are not planning on changing the JavaScript or the CSS, so it is easiest to use the hosted libraries. Reference these in your HTML by adding the following lines of code.

Within the head section, after title, copy and paste the following. This adds the Leaflet CSS file to our web page and includes Leaflet styles.

```html
<!-- External Stylesheets -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.2/dist/leaflet.css" />
```

Link to the JavaScript library at the bottom of the body section of our site, putting it at the bottom allows our page to load faster. Copy and paste the following. This adds the Leaflet JS file to our web page and is the Leaflet Javascript library.

```html
<!-- Add the Leaflet JavaScript library -->
<script src="https://unpkg.com/leaflet@1.0.2/dist/leaflet.js"></script>
```

We can now begin working with the Leaflet library.

### 2.4  Add a map div

Add a div to the body that will hold the map. This is just like any other div element we might use. We will set the style right in the div using the style attribute, and not the CSS file, otherwise all map divs we create will have the same styling.

```html
<div id="map" style="width: 900px; height: 600px"></div>
```

### 2.5 Use Javascript to create the map object

Now we can start coding the map using JavaScript. The Leaflet library is referenced by using L. followed by the class. The first step is to create the map object using the map class. Set the variable map to be our Leaflet map object. More reading on L.map can be found in the extensive Leaflet documentation. Set the center of the map to be at the Memorial Union Quad  `(44.56576, -123.27888)` and zoom level to `14`. Enter the following in our document at the end of the body section.

```html
<script>
    // Create variable to hold map element, give initial settings to map
    var map = L.map('map',{ center: [44.56576, -123.27888], zoom: 16});
</script>
```

> **Note:** 
>
> - the script tags, this is where we will will put all of our JavaScript for the map.
> - Where did I get my Lat/Lon values? **A nice trick can be navigating to [Google Maps](http://maps.google.com)**, right clicking on a location on the map, and selecting 'What's here?'. This will provide latitude and longitude values for that location you can then copy.

### 2.6 Add a tiled basemap with tileLayer

The last step in getting a basic map running is add a layer. We are going to use what is called a tile layer, which is a fundamental technology behind many web maps. There are many tile layers you can add to your maps. The one we are going to use today is from OpenStreetMap. To add a tile layer to the map, we use the L.tileLayer class. Place the following code within your script tags.

```html
// Add OpenStreetMap tile layer to map element
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.jpg', { attribution: '&copy; OpenStreetMap' }).addTo(map);
```

> Note the attribution. Here we can provide reference for the source of the base map, and any other attribution for map elements we want to provide. It will appear in the lower right corner of our map by default, but you can change this. Read more about attribution here.

**Our Basic Map**

Save your HTML document and open your web browser to your localhost server (http://localhost:8000). You will see the map we just created!

![](img/basemap.jpg)

**Additional Tile Layers**

There are a number of resources that have tile layers you can use with Leaflet JS. An excellent resource for examining and previewing tile layers is called Leaflet Provider. Scan [through available tile layers and preview them](http://leaflet-extras.github.io/leaflet-providers/preview/), and try replacing the L.tileLayer with one of the other tile layers in your code.

![](img/layer_preview.jpg)

**Loading a WMS**

You can also add Web Map Services to your Leaflet maps using [L.tileLayer.wms](http://leafletjs.com/reference.html#tilelayer-wms). Web Map Service is a major topic of this course. We will learn how to create web map services in the following classes of this term. 

## 3. Add Individual Data to our Map

To introduce adding data, we will learn how to add markers, polylines, and polygons to our map. There are multiple methods for adding data, including methods in which you can large datasets. Before getting ahead of ourselves though, this section will show how you can simple points, polylines, and polygons to your map.

### 3.1 Adding Points (aka Markers)

To add a point to your map, we use the `L.marker` class. To add a point, we specify a latitude and longitude, then add the marker to our map. Enter the following line of code in the script block in the body section of the document, following the tile layer.

```js
// Create point feature for Wilkinson Hall
var myDataPoint = L.marker([44.56822, -123.28034]).addTo(map);
```

![](img/marker.jpg)

### 3.2 Adding Polylines

To add a polyline (a line that can have multiple segments) to your map, we use the `L.polyline` class. Just like with the marker, we use latitude and longitude to add the line vertices. An important difference however, is that we need to add a color and weight, if we don't add a weight you won't be able to see the line. You can set style options in brackets after the array of line vertices. 

>  **NOTE:** the polyline is formed by an array, and draws in that order. Enter the following into our script.

```js
// Create line feature for the Route from Wilkinson Hall to Strand Ag Hall, style and add to map
var myDataLine = L.polyline([[44.5656915, -123.2775289], [44.5656992, -123.2778923], [44.5662266, -123.2778722], [44.5682559, -123.2778293], [44.5682445, -123.2800823]],
    {color: 'red', weight: 5}).addTo(map);
```
![](img/polyline.jpg)


### 2.3 Adding Polygons

Adding polygons is very similar, we use the L.polygon class. Specify a latitude and longitude for each node, then add to our map. Set the style just the same. Enter the following in our script.

```js
// Create area feature for Strand Ag Hall, style and add to map
var myArea = L.polygon([[44.5651985, -123.2769978],[44.566131, -123.2769978], [44.5661339, -123.2775027], [44.5651985, -123.2775182], [44.5651985, -123.2769978],], 
    {color: 'orange', weight: 5}).addTo(map);
```
Save your document and refresh your browser.

![](img/polygon.jpg)

### 3.4 Other Simple Vector Data Types

There are a number of other simple data types and groups you can add, read more about them in the Leaflet documentation. These include:

- [Path](http://leafletjs.com/reference.html#path)
- [MultiPolyline](http://leafletjs.com/reference.html#multipolyline)
- [MultiPolygon](http://leafletjs.com/reference.html#multipolygon)
- [Rectangle](http://leafletjs.com/reference.html#rectangle)
- [Circle](http://leafletjs.com/reference.html#circle)
- [CircleMarker](http://leafletjs.com/reference.html#circlemarker)

### 3.5 Feature Groups and GeoJSON

Leaflet also supports adding groups of features using class called [L.featureGroup](http://leafletjs.com/reference.html#featuregroup). If we wanted, we could have restructured our code to the point, line, and polygon above by placing them all in a feature group.

Additionally, Leaflet is designed work natively with GeoJson. We will look at how to get GeoJson to a Leaflet Map later.

## References:

[1] http://duspviz.mit.edu/web-map-workshop/leaflet-js/