# Lab 3: Thematic Web Map Design

> Winter 2017 | Geography 371 | Geovisualization: Web Mapping
>
> **Instructor:** Bo Zhao  **Location:** Wilkinson 210 | **Time:** Th 1000 - 1150
>
> **Assigned:** 10/05/2017 | **Due:** `10/19/2017 @11:59pm` | **Points Available** = 50

In this lab, we will design an thematic map about cell towers in Oregon. When creating a web map, one of the key components is styling your elements to provide proper symbolization for your data. This increases legibility for users and can give your map an appealing, custom design. Elements that can be custom designed include thematic layers (i.e., points, lines, and polygons), base maps (as a leaflet `tileLayer`), interactive features (the components of the map that allow for user interaction), and legends and supplemental information (such as credits, acknowledgements, etc.).

To do that, the county boundaries is from [Oregon Explorer](http://oregonexplorer.info), and the spatial distribution of cell towers is from [Map Cruzin](http://www.mapcruzin.com/google-earth-maps-resources/kml/us-cell.kmz). Below is the web map you will make by walking through this lab handout.

![](img/final_map.jpg)

To get started, please synchronize the course material to the working space of your local computer. If you are working in the Digital Earth Lab, please synchronize your course material on the desktop directory.  The material for this lab is located at `[your_working_space]/geog371/labs/lab03`. Next, open the course material in Webstorm. 

## 1. Set up our Map and Add Data

Open `map1.html` in your IDE (Webstorm) to prepare for editing.

**The extent of Oregon State**

In map1.html, you will see a HTML page, with some CSS styling at the top, a couple of div page elements for our map components, linked scripts, and custom scripts. The page elements are as follows:

`map`: the element our map will be attached to;

`credits`: an element inside controls where we can put our contact and copyright information.

**The Script**

Within the script tags, I have added the map object and tile layer for us to use. You've seen the script before. This script creates our map object and adds a base map.

```js
// 1. Create a map object.
var mymap = L.map('map', {center: [44.13, -119.93], zoom: 7});

// 2. Add a base map.
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.jpg', {
    maxZoom: 11,
    minZoom: 6,
    detectRetina: true, //support Retina Display if the client uses high resolution monitor.
    attribution: 'Cell Tower Data &copy; Map Cruzin | Oregon counties &copy; Oregon Explorer | Base Map &copy; CartoDB'
}).addTo(mymap);
```

Please  click the chrome button on the top right, you should see a basic map showing the extent of Oregon.

> **Note:** Please think about how to host this html via python SimpleHTTPServer.

![](img/map1.jpg)

The base map (in tile layer) comes from CartoDB. The light color helps the main features/theme of a web map stand out. In addition to some popular map providers (e.g., Google maps, Bing map, OpenStreetMap, Mapbox, CartoDB, or a list of base map from [Leaflet providers](http://leaflet-extras.github.io/leaflet-providers/preview/)), you can also find many local municipalities and regions around the globe maintain tile layers that can be accessed through GIS software and mapping libraries. Google search your study area combined with another keyword "tile server", you may find some base maps, mostly these base maps are in Web Map Services (WMS) - a map services we will learn in later, that can be loaded into your map as a base map using the Leaflet WMS loader object, `L.tileLayer.WMS`.

>  **Note:** If the provided base maps do not carter to your flavor, you can create custom tiles that can be served to your maps. This topic, on the whole, is large and we will have another series of lectures that introduces creating web map services by GeoServer.

**Add the Cell Towers Data**

Next, we want to add the cell tower data set to the map. To do that, we will use another Javascript library [`leaflet.ajax`](https://github.com/calvinmetcalf/leaflet-ajax) in the `head` element.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-ajax/2.1.0/leaflet.ajax.min.js"></script>
```

In the directory `assets`, you will find a geojson file - `cell_towers.geojson`. Enter the following code snippet to add the cell towers to the map.

```js
// 3.Add cell towers GeoJSON Data
// Null variable that will hold cell tower data
var cellTowers = null;
// Get GeoJSON and put on it on the map when it loads
cellTowers= L.geoJson.ajax("assets/cell_towers.geojson");
// Add the cellTowers to the map.
cellTowers.addTo(mymap);
```

The `cellTowers` object hold the GeoJSON data, and then it adds to the `mymap` object. Save and refresh your map. You should see the points populate. That is a lot of cell towers!  Please open **map2.html** to see how the map looks like.

![](img/map2.jpg)

## 2. Custom Point Markers

Our point markers showing the cell towers are in the default blue Leaflet map pin. While these markers are fine, if you are showing multiple properties or want to create unique symbols, you can set your point symbols to be represented by an icon of your choosing. The steps towards doing this are straightforward. In this lab, we will introduce how to apply a custom icon using **Font Awesome**. 

### 2.1 Create the color scheme for markers

[**Font Awesome**](http://fontawesome.io/) allows you to add icons by CSS classes. To apply Font Awesome, you will need to include its css link in the `head` element of a web map.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"/>
```

In addition, we will use another library `chroma.js` to colorize the icon, and utilize `$` of `jQuery` to manipulate `html` elements. [Chroma.js](https://gka.github.io/chroma.js/) is a javascript library to manipulate colors. Therefore, we need to include both `chroma.js` and `jQuery` in the head tag.

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/chroma-js/1.3.4/chroma.min.js"></script>
```

Furthermore, we also need some predefined color ramp to symbolize geographic features. [ColorBrewer](http://colorbrewer2.org/) is an online tool designed to help people select good color schemes for maps and other graphics. It provides three types of palettes: sequential, diverging and qualitative.

- Sequential palettes are suited to ordered data that progress from low to high.
- Diverging palettes are suited to centered data with extremes in either direction.
- Qualitative palettes are suited to nominal or categorical data.

![](img/colorbrewer.jpg)

> **Note:** Color palettes from Color Brewer

We need to create a set of random colors for representing cell tower of different companies. The color should follow the qualitative palettes because this palettes can better visual the nominal and categorical data. Therefore, we select the `set2` category. Since there are 9 cell towers in Oregon, we will create nine different colors. To apply these colors, we dynamically build classes and then embed these classes in `style` elements.  The style classes are from `marker-color-1` to `marker-color-9`. Each class include a color `property`. Below is the code snippet.

```javascript
// 4. build up a set of colors from colorbrewer's "set2" category
var colors = chroma.scale('Set2').mode('lch').colors(9);

// 5. dynamically append style classes to this page. This style classes will be used for colorize the markers.
for (i = 0; i < 9; i++) {
    $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}
```

>**Note:**  Refer to the color palettes from color brewer, and try other palettes such as `Set1`, `Dark2` , etc.

### 2.2 Assign a style class to each company

Next, we will assign a style class to each company. We have nine different wireless companies, such as New Cingular, Verizon, Cello, Salem Cellular, etc.  We number the company name from 0 to 8, and then assign the style class (from `marker-color-1` to `marker-color-9`) to markers. If the value of `feature.property.company` is equal to "New Cingular", we set `marker-color-1` class to it, and so on so forth.

Here we use`If.. Else` statements. To do this, we can put a conditional statement to see if the `feature.property.company` is equal to a specific company name.  If it equals, we set the id value, and if not, the else statement will run, setting other id value. Below is the code snippet.

```javascript
function (feature, latlng) {
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
```

### 2.3. Apply an Icon

We apply an icon to each marker. To apply that, you will simply link the class with the marker. Notably, an javascript object or html element can carry multiple class. In our case, a class `fa` informs that the font awesome will be applied, and another class `fa-signal` informs that an icon showing a signal will be added. And other classes `marker-color-1~9` deal with color, font-size, as well as text-shadow.

>**Note:** If you feel a little confused about the style properties of a class, please try to change the property value to some extreme numbers, and then see the differences. For example, you can change the font-size from 15 to 100, and then see what has been changed.

**Use `point to layer` option of `L.geoJson` to set the icon**

To set the icon for a GeoJSON, we need to create a layer from the GeoJSON (we can style it if it is a layer) by using the `pointToLayer` option of `L.geoJson`. `pointToLayer` runs a function when the GeoJSON is loaded that takes a feature and latitude and longitude and creates a marker at that latitude and longitude.

```js
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
```

> **Note:** there are *two equal signs (==)*, this is because JavaScript is very particular about operators. To read more, check out this documentation from `w3schools`.

**Options available for `L.geoJson` include**:

- `pointToLayer`: Function that will be used for creating layers for GeoJSON points (if not specified, simple markers will be created).
- `style`: Function that will be used to get style options for vector layers created for GeoJSON features.
- `onEachFeature`: Function that will be called on for each created feature layer. Useful for attaching events and popups to features.
- `filter`: Function that will be used to decide whether to show a feature or not.
- `coordsToLatLng`: Function that will be used for converting GeoJSON coordinates to LatLng points (if not specified, coordinates will be assumed to be WGS84 — standard [longitude, latitude] values in degrees).

In addition to `pointToLayer`, we will use `onEachFeature` option to set the popup.

```js
// assign a function to the onEachFeature parameter of the cellTowers object.
// Then each (point) feature will bind a popup window.
// The content of the popup window is the value of `feature.properties.company`
onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.company);
},
```
 Please open **map3.html** to see how the map looks like. We have changed icon to cell tower! 

![](img/map3.jpg)


## 3. Polygon Data and Symbolization

In `assets` directory, you'll see another dataset  `counties.geojson`. This file stores all the counties of Oregon. Each county contains the number of cell towers; this number is pre-calculated in QGIS. To add the data to the map, create another `L.geoJson` object using the `ajax()` method. Enter the following code at the end of your script, staying within the `script` tags.


```js
// create the county layer
L.geoJson.ajax("assets/counties.geojson").addTo(mymap);
```

Save and refresh your map. Counties of Oregon will be displayed on the map, symbolized in a default blue.

![](img/map4-1.jpg)


Let's do something about that default blue and thematically style our data to these polygons useful by turning them into a choropleth layer. The `counties.geojson` file contains numbers of cell towers in each county, calculated in QGIS.  To symbolize the counties  by the number of counties, we will use the `style` option that contains styling properties.

### 3.1 Set a sequential color palette

The first step is to set up a function to create classification breaks. One way to hard code the colors is to make the color scheme via QGIS, selecting some classification rule like Jenk's Natural Breaks, and copy the break numbers as well as color value. Or you can check out a color ramp from [colorbrewer2.org](). In this lab, you will use `chroma.js` to dynamically create an array of colors. Since the number of cell tower in each county is ordered data that progress from low to high, we will use a sequential color palette `OrRd` (meaning from Orange to Red). Then, we develop a `setColor` function that returns the color value using the number of cell tower lying in a county. Add the following code snippet in the `script` element.

```js
// Create an array of colors
colors = chroma.scale('OrRd').mode('hsl').colors(5); //colors = chroma.scale('OrRd').colors(5);

// setColor function will return a color value using an input value (the density)
function setColor(density) {
    var id = 0;
    if (density > 18) { id = 4; }
    else if (density > 13 && density <= 18) { id = 3; }
    else if (density > 10 && density <= 13) { id = 2; }
    else if (density > 5 &&  density <= 10) { id = 1; }
    else  { id = 0; }
    return colors[id];
}
```

### 3.2 Apply the color palette

Next, develop a function that will set the style option of  `L.geoJson.ajax()` object. We name this function `style` and it can accept a GeoJson feature. Having the feature loaded, this function sets the `fillColor` property with `setColor` function as well as an input value - `feature.properties.CN_CNT`.  Then, we add the following code snippet in the `script` element.

```js
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
```

While `fillColor` and `fillOpacity` properties are for the fill; `weight`, `opacity`, `color`, and `dashArray` properties are for the border.

### 3.3 Set style option

The final step is to set the style option for the county layer. Below shows the code of adding the county polygons to the map, and also applying the style.

```js
// Add county polygons
L.geoJson.ajax("assets/counties.geojson", {
    style: style
}).addTo(map);
```

Save and refresh your map. Load your page to see our styled polygons!

![](img/map4.jpg)

## 4. Map Elements

Our map is looking good, but we need a legend to make sense of our data. We could enable popups for each of the counties, but with popups already enabled on our points, it might be overwhelming to the user. Instead, let us add a legend to our map that contains the information the reader will need to know about the data, colors, and classifications, and then add a scale bar to the corner of the map. The main Leaflet object we will use in this section is the `Control` object, or `L.control`. It allows for adding various elements to your map.

### 4.1 Add a Legend

Adding a legend is easy, but requires quite a bit of code. The workflow to create a legend involves creating a Leaflet control, setting the control to populate with HTML that represents the legend components, and styling the HTML with CSS so they appear properly on our screen. I'm going to throw a bit more code at you this time, and we will walk through what it is doing. Enter the following block of code to your `script` (stay in those script tags!).

```js
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
```

So, what did we do here? First, we created an instance of a  **Leaflet Control object**, calling it legend, and used the position option to tell it to locate in the top right of our map. Next, we used the `onAdd` method of the control to run a function when the legend is added. That function created a new div in the DOM, giving it a class of legend. This allowed the CSS to style everything using the legend element. In the newly created div, we are going to populate it with HTML by using a built-in JavaScript DOM method called innerHTML. Using innerHTML allows us to change the content of the HTML and add to the legend div. Using the plus-equal `+=` instead of equal `=` is the syntax for append. Every time this is used, code following is appended to existing code. In this, we write the HTML we want to use in our legend. Note, the `i` tag represents our legend icons. Within the HTML, fill in the colors and ranges so that they match our data classification. After the HTML is appended, return the div element. Lastly, add the legend to the map.

> **Note:** Instead of using innerHTML, what in jQuery can we use to do the same task?

**Use CSS to Style**

If we save and refresh, the items you see won't make much sense, we need to use CSS to give them placement and organization on the page. The following CSS code will style our elements. Enter it between the style tags in the head of your HTML document. Like above, we'll then walk through what it does.

```css
.legend {
    line-height: 16px;
    width: 140px;
    color: #333333;
    font-family: 'Open Sans', Helvetica, sans-serif;
    padding: 6px 8px;
    background: white;
    background: rgba(255,255,255,0.5);
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    border-radius: 5px;
}

.legend i {
    width: 16px;
    height: 16px;
    float: left;
    margin-right: 8px;
    opacity: 0.9;
}

.legend img {
    width: 16px;
    height: 16px;
    margin-right: 3px;
    float: left;
}

.legend p {
    font-size: 12px;
    line-height: 16px;
    margin: 0;
}
```

First, we set properties for the legend using `.legend` to style the legend class. We set a line height, color, font, padding, background, drop shadow, and border corner radius. Next we set our icon (`i`) tag, this should be set to float: left; so that elements will align into columns, then we set properties for the image (`img`) tag, making them the same size and giving them the same float as the icons. Lastly, we style our paragraph tag (`p`), making sure line-height is consistent with the others. Save and refresh your map. You should see your styled legend applied to your map.

### 4.2 Add a Scale Bar

The Leaflet Control object allows you to add a number of elements, including attribution and zoom controls. To add a scale bar, please enter the following line to add a scale bar to your map.

```js
// Add a scale bar to map
L.control.scale({position: 'bottomleft'}).addTo(mymap);
```

Save and refresh. The current state of our map.

## 5. Style your Interface

Let's finish today with some interface customization. Let's just do two simple things to further customize our interface, change the font, and right justify the credits.

**Change the Fonts**

Choosing fonts is an important part of cartography, and an often overlooked one. Right now, our map uses the default Browser font, usually Times New Roman. To edit fonts, we want to style CSS. In CSS, there are a lot of options for fonts, for more reading, check out the [w3schools font documentation](http://www.w3schools.com/css/css_font.asp).

Traditionally, a font is loaded into your page only if you have it on your computer. This presents a problem though, if someone doesn't have the font, it will change the page to use secondary or default fonts. In order to ensure that every visitors computer display the same, you can link to online font libraries. A common, useful online font library is Google Fonts. Google fonts can be added to any site, and since you link to the style, you don't have to worry about the user not having the font installed on their computer. Check out the Google Font library and explore their options. Let's link a common web font called Open Sans to our document so we can use it. To link it to our document, enter the following line of code into the head section of your document. It should go right after your stylesheets.

```html
<head>...
<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
...</head>
```

Next, to style all text in our document with the Open Sans font, modify the body tag in the CSS (the code between the style tags). Modify the body CSS properties to look like the following, adding a font-family property after margin.

```html
body {
    margin: 0px;
    font-family: 'Open Sans', Helvetica, sans-serif;
}
```

Save and refresh your map. Open Sans will now be your preferred font!

**Style the credits using CSS**

Lastly, to help you explore the power of CSS, style the credits at the bottom of your page. Because the div containing the credits has `id="credits"`, we can style it using #credits. All of the contents in the credits div are between two paragraph tags. CSS styling is written in a nested fashion, to style everything that is in a p element within the `#credits div`, we use `#credits p`. Add the following snippet between the style tags in the head section of the document.

```css
#credits p {
	margin-top: 5px;
	font-size: 12px;
	text-align: right;
	line-height: 16px;
}
```
Save and refresh your map. It will look like the following!

![](img/final_map.jpg)

## 6. Deliverable

After you successfully deploy this cell tower map, you are expected to build another web map of airports in United States. In the `assets` directory of this lab, you will see two geojson files: one is [`airports.geojson`](assets/airports.geojson), another is [`us-states.geojson`](assets/us-states.geojson).

`airports.geojson` contains all the airports in United States. This data is converted from a shapefile, which was downloaded and unzipped from https://catalog.data.gov/dataset/usgs-small-scale-dataset-airports-of-the-united-states-201207-shapefile. For each airport feature, the field `CNTL_TWR` indicates whether the airport has an air traffic control tower or not. If there is a tower, the value of `CNTL_TWR` is 'Y', otherwise 'N'. You may need to find an appropriate icon on `font awesome`. **(6 points)**

`us-states.geojson` is a geojson data file containing all the states boundaries of United States. This data is acquired from from [Mike Bostock](http://bost.ocks.org/mike) of [D3](http://d3js.org/). The `count` field indicates the number of airports within the boundary of the state under investigation. So please make a choropleth map based on the number of airports within each state.  **(5 points)**

Regarding the grading criteria, this web map of airports needs include:

- an appropriate basemap;  **(5 points)**
- some interactive elements, like a clickable marker; **(5points)**
- some map elements, such as legend, scale bar, credit;  **(5 points)**
- add on a new feature (e.g., a map control, a map event, or a new map object, etc.) which is not introduced in this lab as well as other lectures of the web map client series; **(6 points)**

- you will need to synchronize this project to a github repository. And make sure the web map is accessible from a url link, which should be similar to `http://[your_github_username].github.io/[your_repository_name]/index.html`. (You may want to check out previous lecture or lab handouts on project management and hosting via github); **(6 points)**

- please make sure the internal structure of the files in your project repository is well organized. For example, it may be similar to the file structure below. **(4 points)**

```powershell
[your_repository_name]
    │index.html
    │readme.md
    ├─assets
    │      airports.geojson
    │      us-states.geojson
    ├─css
    │      main.css
    ├─img
    │      xxx.jpg
    └─js
            main.js
```

- write up a project description in the `readme.md` file. This file will introduce the project name, a brief introduction, the major functions(especially the function which was not covered in the lectures), libraries, data sources, credit, acknowledgement, and other necessary information. **(8 points)**


Before submitting this lab, please make sure both the **GitHub repository** and the **GitHub page** work properly. In this lab, you are excepted to submit the url of the GitHub repository to the **Canvas Dropbox** of this course. This url should be in the format of `https://www.github.com/[your_github_username]/[your_repository_name]`. To do that, check the item of this lab on the assignment tab, and then press the `Submit Assignment` button. Please contact the instructor if you have any difficulty in submitting the url link. Here are the grading criteria:


> If you have a genuine reason(known medical condition, a pile-up of due assignments on other courses, ROTC,athletics teams, job interview, religious obligations etc.) for being unable to complete work on time, then some flexibility is possible. However, if in my judgment you could reasonably have let me know beforehand that there would likely be a delay, and then a late penalty will still be imposed if I don't hear from you until after the deadline has passed. For unforeseeable problems,I can be more flexible. If there are ongoing medical, personal, or other issues that are likely to affect your work all semester, then please arrange to see me to discuss the situation. There will be NO make-up exams except for circumstances like those above.

## Reference

[1] Map Symbolization http://duspviz.mit.edu/web-map-workshop/map-symbolization/

[2] Data source: http://www.mapcruzin.com/google-earth-maps-resources/google-earth-cell-towers.htm

[3] Boundary: http://oregonexplorer.info/ExternalContent/SpatialDataForDownload/RCE_counties.zip

[4] Add topojson instead of geojson http://blog.webkid.io/maps-with-leaflet-and-topojson/
