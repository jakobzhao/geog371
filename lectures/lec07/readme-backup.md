# Map Client I: Basics and Geographic Features

> Winter 2017 | Geography 370 | Geovisualization: Web Mapping
>
> Instructor: Bo Zhao | TA: Andy Wilson | Location: 235 Wilkinson | Time: Monday 2-2:50pm

So, you know some basics about webpages and their elements. Now you want to make a web map! To do that, this lecture will start our jouney with Leaflet, a Javascript library used to create interactive, web-based, mobile-friendly maps. With Leaflet, you can create a simple map in as little as three lines of code, or you can build complex, dynamic, and complex maps that contain hundreds of lines. This lecture assumes you have worked through basics of the previous lecture and lab exercises, and have a working knowledge of HTML, CSS and JavaScript. The lecture will help you build a web map from the ground up.

## Web Maps recap

The term "web map" often implies a map that is not simply on the web, but rather one that is powered by the web. A digital map is a map on a computer, a web map is depends on the internet. It is usually interactive, and not always self-contained, meaning it can `grab components from other locations`.

> Question: What are the components? How can we link these components in a web map?

The two big concepts are `tiles`, which are gridded images that make up our basemaps, and `geographic features`, which can be points, lines, and polygons. Tiles are static and non-interactive, while the feature data layers can be dynamic and offer user interaction.

A vast overview of the web map universe shows some of the many components that can be used to make a technology stack. We will focus on Leaflet, which is a front-end JavaScript library that allows creation of nice, mobile friendly mapping applications.

## What is Leaflet?

Leaflet is an open-source JavaScript library for interactive web maps. It's lightweight, simple, and flexible, and is probably the most popular open-source mapping library at the moment. Leaflet is developed by Vladimir Agafonkin (currently of MapBox) and other contributors.

What Leaflet does: "Slippy" maps with tiled base layers, panning and zooming, and feature layers that you supply. It handles various basic tasks like converting data to map layers and mouse interactions, and it's easy to extend with plugins. It will also work well across most types of devices. See MaptimeBoston's Web Map 101 for an introduction to the most common kinds of web maps, which is what Leaflet is good for.

What Leaflet does not do: Provide any data for you! Leaflet is a framework for showing and interacting with map data, but it's up to you to provide that data, including a basemap. Leaflet is also not GIS, although it can be combined with tools like CartoDB for GIS-like capabilities. If you need total freedom of form, interaction, transitions, and map projections, consider working with something like D3.

How this tutorial works: It's structured around examples that progressively build upon one another, starting from scratch. We will start with an empty webpage, then progressively add components to make a Leaflet map. It assumes a basic knowledge of HTML and JavaScript, or at the very least assumes the will to tinker with the code to better understand what it does. It won't explain every little object or array, but will contain plenty of links. Many code blocks will show only a snippet of code, highlighting the changes over previous examples. Click the "View this example on its own" link underneath a map to see complete code. For thorough documentation, see the Leaflet site.

A couple quick tips.

Use a text editor for writing your code, such as Sublime Text or Notepad++. For more on text editors, see the Text Editors section on the DUSPVIZ Design and Coding page.
Keep all of your components in one folder. This will make locating specific files in your code much easier.
To put your map on the web, upload the folder with your website and map components (that we will create) to your web server. A note, however, most of this tutorial will work locally, but at the end we are going to add an external file. If you don't have access to the web, set up a localhost server. Here are some details using Python to do so.
The exercise today utilizes the Python SimpleHTTPServer method, which is very easy to run and set up, and only requires you have Python installed. It will work for our purposes.

Our Final Map (for today...)

Our goal for the day will be to start from scratch and build the following map, with a tile base layer, some mapped data, and some basic interactivity. Our end result will be the following map, showing coffee shops, cafes, the MIT campus, and the Mass Ave Bridge.

[An Inserted Map]

Our simple leaflet map. (Click to view this example on its own.)

Let's get started! On to step one!

1. Create a Webpage and Simple Map
Download the Materials
a. Create a working folder

Our first step is create a working folder. Use the provided materials folder and place it in your web folder (server). This folder will store all of the files associated with our specific web page and web map.

Don't have a web folder? Serve locally!

If you don't have access to a web folder or server, you can set up a local development environment that mimics a web server on your own machine. This is called a localhost server. In this exercise, a simple Python localhost server will do. Read the instructions on setting up a Python SimpleHTTPServer here.

b. Setup a web page for our map

Open up your text editor. Once in your text editor, we are going to set up an empty index.html template for our web page that will contain our web map and web map elements. The components will be the same as always, note the head, title, and body.

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

Reference the Leaflet CSS and JavaScript files.
Add a div element to our page that will hold the map.
Create a map object in Javascript that will interact with the map div element
Add the tiled OpenStreetMap basemap to our map object using tileLayer
c. Reference the Leaflet CSS and JavaScript files

We need to load Leaflet into our web page before we can start using the library. There are two options for doing this, we can download the library files from the Leaflet download site, or we can use the hosted version. We are not planning on changing the JavaScript or the CSS, so it is easiest to use the hosted libraries. Reference these in your HTML by adding the following lines of code.

Within the head section, after title, copy and paste the following. This adds the Leaflet CSS file to our web page and includes Leaflet styles.

```html
<!-- External Stylesheets -->
<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
```


Link to the JavaScript library at the bottom of the body section of our site, putting it at the bottom allows our page to load faster. Copy and paste the following. This adds the Leaflet JS file to our web page and is the Leaflet Javascript library.

```html
<!-- Add the Leaflet JavaScript library -->
<script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
```

We can now begin working with the Leaflet library.

d. Add a map div

Add a div to the body that will hold the map. This is just like any other div element we might use. We will set the style right in the div using the style attribute, and not the CSS file, otherwise all map divs we create will have the same styling.

```
<div id="map" style="width: 705px; height: 375px"></div>
```

e. Use Javascript to create the map object

Now we can start coding the map using JavaScript. The Leaflet library is referenced by using L. followed by the class. The first step is to create the map object using the map class. Set the variable map to be our Leaflet map object. More reading on L.map can be found in the extensive Leaflet documentation. Set the center of the map to be at MIT (42.362432, -71.086086) and zoom level to 14. Enter the following in our document at the end of the body section.

```
<script>
    // Create variable to hold map element, give initial settings to map
    var map = L.map('map',{ center: [42.362432, -71.086086], zoom: 14});
</script>
```

Note the script tags, this is where we will will put all of our JavaScript for the map.

f. Add a tiled basemap with tileLayer

The last step in getting a basic map running is add a layer. We are going to use what is called a tile layer, which is a fundamental technology behind many web maps. An excellent crash course on web maps and the usage of tiles was created by MaptimeBoston, and can be found here.

There are many tile layers you can add to your maps. The one we are going to use today is from OpenStreetMap. To add a tile layer to the map, we use the L.tileLayer class. Place the following code within your script tags.

```
// Add OpenStreetMap tile layer to map element
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
```

Note the attribution. Here we can provide reference for the source of the base map, and any other attribution for map elements we want to provide. It will appear in the lower right corner of our map by default, but you can change this. Read more about attribution here.

Our Basic Map

Save your HTML document and open your web browser, preferably Chrome or Firefox, to your localhost server (http://localhost:8000). You will see the map we just created!

Our basic map. (Click to view this example on its own.)

Additional Tile Layers

There are a number of resources that have tile layers you can use with Leaflet JS. An excellent resource for examining and previewing tile layers is called Leaflet Provider. Scan through available tile layers and preview them, and try replacing the L.tileLayer with one of the other tile layers in your code.

Loading a WMS

You can also add Web Map Services to your Leaflet maps using L.tileLayer.wms. The example provided in the documentation shows adding a weather layer to your map.

2. Add Individual Data to our Map
To introduce adding data, we will learn how to add markers, polylines, and polygons to our map. There are multiple methods for adding data, including methods in which you can large datasets. Before getting ahead of ourselves though, this section will show how you can simple points, polylines, and polygons to your map.

a. Adding Points (aka Markers)

To add a point to your map, we use the L.marker class. To add a point, we specify a latitude and longitude, then add the marker to our map. Enter the following line of code in the script block in the body section of the document, following the tile layer.

```
// Create point feature for Kendall Square T Station
var myDataPoint = L.marker([42.362432, -71.086086]).addTo(map);
```

b. Adding Polylines

To add a polyline (a line that can have multiple segments) to your map, we use the L.polyline class. Just like with the marker, we use latitude and longitude to add the line vertices. An important difference however, is that we need to add a color and weight, if we don't add a weight you won't be able to see the line. You can set style options in brackets after the array of line vertices. NOTE: the polyline is formed by an array, and draws in that order. Enter the following into our script.

```
// Create line feature for Mass Ave Bridge, style and add to map
var myDataLine = L.polyline([[42.357227, -71.092631], [42.351411, -71.089723]],
    {color: 'red', weight: 10}).addTo(map);
```

c. Adding Polygons

Adding polygons is very similar, we use the L.polygon class. Specify a latitude and longitude for each node, then add to our map. Set the style just the same. Enter the following in our script.

```
// Create area feature for MIT, style and add to map
var myArea = L.polygon([[42.353770, -71.103606], [42.355447, -71.104475],
    [42.362681, -71.089830], [42.361829, -71.079230]],
    {color: 'blue', weight: 4}).addTo(map);
```

Save your document and refresh your browser.

Other Simple Vector Data Types

There are a number of other simple data types and groups you can add, read more about them in the Leaflet documentation. These include:

Path
MultiPolyline
MultiPolygon
Rectangle
Circle
CircleMarker
Feature Groups and GeoJSON

Leaflet also supports adding groups of features using class called L.featureGroup. If we wanted, we could have restructured our code to the point, line, and polygon above by placing them all in a feature group.

Additionally, Leaflet is designed work natively with a geographic data format called GeoJSON. GeoJSON are lightweight JavaScript objects that are commonly used to pass and load data to web maps. We will look at them later in this exercise, but first, lets add some interactivity by including some pop ups on the data we have already added. At this point we have some features loaded on to our map, and it should look something like the following.

Our basic map, now with features! (Click to view this example on its own.)

Where did I get my Lat/Lon values? A nice trick can be navigating to Google Maps, right clicking on a location on the map, and selecting 'What's here?'. This will provide latitude and longitude values for that location you can then copy.
Where did I get my Lat/Lon values? A nice trick can be navigating to Google Maps, right clicking on a location on the map, and selecting 'What's here?'. This will provide latitude and longitude values for that location you can then copy.


## Reference:
http://duspviz.mit.edu/web-map-workshop/leaflet-js/