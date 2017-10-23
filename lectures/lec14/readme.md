# Map Server V: Map Tiles

> Fall 2017 | Geography 371 | Geovisualization: Web Mapping
>
> **Instructor:** Bo Zhao | **Location:** WLKN 235 | **Time:** MWF 1200 - 1250

**Learning Objectives**

- Understand the structure of tile system;
- How to create catch via GeoWebCache; and
- Generate tiles using QTiles (hands-on).

# 1. Overview

As mentioned in previous lessons, the earliest web maps were typically drawn on the fly by the server, no matter how many layers were available or requested. These are the types of maps you just created using GeoServer and WMS. As you may have noticed, **the symbol sets and labeling choices for this type of map are relatively limited and complex to work with**. In fact, for many years, web cartographers had to build a map with minimal layer set and simple symbols to avoid hampering performance. In many cases, a cartographer was not even involved; instead, the web map was made by a server administrator tweaking SLD files that defined the layer order, symbol sizes, and so forth. This was the case with both open specification web services (like WMS) and proprietary web services (like Esri ArcIMS).

Part of this approach stemmed from early efforts to make web GIS applications look exactly like their desktop counterparts. Sometimes these are referred to as “Swiss Army Knife applications” because they try to do everything (you may know one!). People expected that in a web GIS they should be able to toggle layer visibility, reorder layers, change layer symbols on the fly, and do everything else that they were accustomed to doing on the desktop. Ironically, this mindset prevailed at a time when web technology was least suited to accommodate it.

In the mid-2000s, after Google Maps, Microsoft Virtual Earth (now Bing Maps), and other popular mapping applications hit the web, **people started to realize that maybe they didn't need the ability to tinker with the properties of every single layer**. These providers had started fusing their vector layers together in a single rasterized image that was divided into 256 x 256 pixel images, or tiles. These tiles were pregenerated and stored on disk for rapid distribution to clients. This was done out of necessity to support hundreds or thousands of simultaneous users, a burden too great for drawing the maps on the fly.

The figure below shows how a tiled map consists of a "pyramid" of images covering the extent of the map across various scales. Tiled maps typically come with a level, row, and column numbering scheme that can be shared across caches to make sure that tile boundaries match up if you are overlaying two tile sets.

![ Tile Pyramid](img/tile_pyramid.png)

> Tiled web maps take the form of a pyramid where the map is drawn at a progressive series of scale levels, with the smallest (zoomed out) scales using fewer tiles.

Cartographers loved the tiled maps, because now they could invest all the tools of their trade into making an aesthetically pleasing web map without worrying about performance. Once you had created the tiles, you just had a set of images sitting on disk, and the server could retrieve a beautiful image just as fast as it could retrieve an ugly one. And because the tiled map images could be distributed so quickly by a web server, Google and others were able to employ **asynchronous JavaScript and XML (AJAX)** programming techniques to retrieve the tiles with no page blink as people panned.

> AJAX stands for Asynchronous JavaScript and XML. In a nutshell, it is the use of the `XMLHttpRequest` object to communicate with server-side scripts. It can send as well as receive information in a variety of formats, including JSON, XML, HTML, and even text files. AJAX’s most appealing characteristic, however, is its "asynchronous" nature, which means it can do all of this without having to refresh the page. This lets you update portions of a page based upon user events.


> The two major features of AJAX allow you to do the following:
>
> - Make requests to the server without reloading the page
> - Receive and work with data from the server

Within a year or two of Google Maps' release, commercial GIS software began offering the ability to build map tiles. For many, ArcGIS Server was desirable because the map could be authored using the mature map authoring tools in ArcMap; however, cost was a concern for some. [Arc2Earth](https://www.arc2earth.com/) was another commercial alternative. The free and open source [Mapnik](http://mapnik.org/) library could also build tiles, but it wasn't until recent years that projects like [TileMill](https://tilemill-project.github.io/tilemill/) wrapped a user-friendly GUI around Mapnik.

![ Tiles from OpenStreetMap data, rendered by MapQuest](img/tiled_map.jpg)

> Credit: Tiles from OpenStreetMap data, rendered by MapQuest

Tiled maps were the only model that could reasonably work for serving complex web maps to thousands of simultaneous users. However, they eliminated the ability for users to change layer order or symbols. People started working around this by serving out their general-purpose basemap layers as tiles and then overlaying a separate layer with thematic information. The general-purpose basemap tiles could be re-used in many applications. The thematic layers could also be tiled if the data did not change too quickly or cover too broad an area at large scales. For example, if you examine Google Maps with a developer tool, you will see that the basemap and the thematic layers (such as Panoramio photographs) are both retrieved as tiles.

![ Photos appearing as tiles in Google Maps](img/google_photo_tiles.png)

> The thematic layer of Panoramio photos is brought into Google Maps as predrawn tiles. This is evident when viewing the layer in Firebug.

## 2. Bing Tile System

The tile system of Microsoft Bing map is one of the earliest map tile system. To illustrate how the tile system work, I will focus on the Bing Tile system in this section. Bing Maps provides a world map that users can directly manipulate to pan and zoom. To make this interaction as fast and responsive as possible, Bing chose to pre-render the map at many different levels of detail, and to cut each map into tiles for quick retrieval and display. This section describes the projection, coordinate systems, and addressing scheme of the map tiles, which collectively are called the Bing Maps Tile System.

### 2.1 Map Projection

To make the map seamless, and to ensure that aerial images from different sources line up properly, we have to use a single projection for the entire world. We chose to use the **Mercator projection**, which looks like this:

![img](img/bing_overview.png)

Although the Mercator projection significantly distorts scale and area (particularly near the poles), it has two important properties that outweigh the scale distortion:

1. It’s a **conformal** projection, which means that it preserves the shape of relatively small objects. **This is especially important when showing aerial imagery**, because we want to avoid distorting the shape of buildings. Square buildings should appear square, not rectangular.
2. It’s a **cylindrical** projection, which means that **north and south** are always straight up and down, and west and east are always straight left and right.

Since the Mercator projection goes to infinity at the poles, it doesn’t actually show the entire world. Using a square aspect ratio for the map, the maximum latitude shown is approximately 85.05 degrees.

To simplify the calculations, we use the spherical form of this projection, not the ellipsoidal form. Since the projection is used only for map display, and not for displaying numeric coordinates, we don’t need the extra precision of an ellipsoidal projection. The spherical projection causes approximately 0.33% scale distortion in the Y direction, which is not visually noticeable.

### 2.2 Ground Resolution and Map Scale

In addition to the projection, the ground resolution or map scale must be specified in order to render a map. At the lowest level of detail `Level 1`, the map is 512 x 512 pixels. At each successive level of detail, the map width and height grow by a factor of 2: Level 2 is 1024 x 1024 pixels, Level 3 is 2048 x 2048 pixels, Level 4 is 4096 x 4096 pixels, and so on. In general, the width and height of the map (in pixels) can be calculated as:

$$
map width = map height = 256 * 2^\mathit{level} pixels
$$

The **ground resolution** indicates the distance on the ground that’s represented by a single pixel in the map. For example, at a ground resolution of 10 meters/pixel, each pixel represents a ground distance of 10 meters. The ground resolution varies depending on the level of detail and the latitude at which it’s measured. Using an earth radius of 6,378,137 meters, the ground resolution (in meters per pixel) can be calculated as:

$$
ground resolution = cos(latitude * pi/180) * earth circumference / map width \\
= (cos(latitude * pi/180) * 2 * pi * 6378137 meters) / (256 * 2^\mathit{level} pixels)
$$

The **map scale** indicates the ratio between map distance and ground distance, when measured in the same units. For instance, at a map scale of 1 : 100,000, each inch on the map represents a ground distance of 100,000 inches. Like the ground resolution, the map scale varies with the level of detail and the latitude of measurement. It can be calculated from the ground resolution as follows, given the screen resolution in dots per inch, **typically 96 dpi**:

$$
map scale = 1 : ground resolution * screen dpi / 0.0254 meters/inch  \\

= 1 : (cos(latitude * pi/180) * 2 * pi * 6378137 * screen dpi) / (256 * 2^\mathit{level} * 0.0254)
$$

> **Retina Display:**  Retina Display is a brand name used by Apple for its series of IPS panel displays that have a higher pixel density than traditional displays. Apple has applied to register the term "Retina" as a trademark in regard to computers and mobile devices. When introducing the iPhone 4, Steve Jobs said the number of pixels needed for a Retina Display is **326PPI** . 

> **The `detectRetina` Option for LeafLet TileLayer:** If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution. For example,

```js
L.tileLayer('nyc/{z}/{x}/{y}.png', {
  attribution: 'Generated by QTiles',
  detectRetina: true
}).addTo(map);
```

This table shows each of these values at each level of detail, **as measured at the Equator**. (Note that the ground resolution and map scale also vary with the latitude, as shown in the equations above, but not shown in the table below.)

| **Level of Detail** | **Map Width and Height (pixels)** | **Ground Resolution (meters / pixel)** | **Map Scale(at 96 dpi)** |
| ------------------: | --------------------------------: | -------------------------------------: | :----------------------- |
|                   1 |                               512 |                            78,271.5170 | 1 : 295,829,355.45       |
|                   2 |                             1,024 |                            39,135.7585 | 1 : 147,914,677.73       |
|                   3 |                             2,048 |                            19,567.8792 | 1 : 73,957,338.86        |
|                   4 |                             4,096 |                             9,783.9396 | 1 : 36,978,669.43        |
|                   5 |                             8,192 |                             4,891.9698 | 1 : 18,489,334.72        |
|                   6 |                            16,384 |                             2,445.9849 | 1 : 9,244,667.36         |
|                   7 |                            32,768 |                             1,222.9925 | 1 : 4,622,333.68         |
|                   8 |                            65,536 |                               611.4962 | 1 : 2,311,166.84         |
|                   9 |                           131,072 |                               305.7481 | 1 : 1,155,583.42         |
|                  10 |                           262,144 |                               152.8741 | 1 : 577,791.71           |
|                  11 |                           524,288 |                                76.4370 | 1 : 288,895.85           |
|                  12 |                         1,048,576 |                                38.2185 | 1 : 144,447.93           |
|                  13 |                         2,097,152 |                                19.1093 | 1 : 72,223.96            |
|                  14 |                         4,194,304 |                                 9.5546 | 1 : 36,111.98            |
|                  15 |                         8,388,608 |                                 4.7773 | 1 : 18,055.99            |
|                  16 |                        16,777,216 |                                 2.3887 | 1 : 9,028.00             |
|                  17 |                        33,554,432 |                                 1.1943 | 1 : 4,514.00             |
|                  18 |                        67,108,864 |                                 0.5972 | 1 : 2,257.00             |
|                  19 |                       134,217,728 |                                 0.2986 | 1 : 1,128.50             |
|                  20 |                       268,435,456 |                                 0.1493 | 1 : 564.25               |
|                  21 |                       536,870,912 |                                 0.0746 | 1 : 282.12               |
|                  22 |                     1,073,741,824 |                                 0.0373 | 1 : 141.06               |
|                  23 |                     2,147,483,648 |                                 0.0187 | 1 : 70.53                |

### 2.3 Pixel Coordinates

Having chosen the projection and scale to use at each level of detail, we can convert geographic coordinates into pixel coordinates. Since the map width and height is different at each level, so are the pixel coordinates. The pixel at the upper-left corner of the map always has pixel coordinates (0, 0). The pixel at the lower-right corner of the map has pixel coordinates $$(width-1, height-1)$$, or referring to the equations in the previous section, $$(256 * 2^level–1, 256 * 2^\mathit{level}–1)$$. For example, at level 3, the pixel coordinates range from (0, 0) to (2047, 2047), like this:

![img](img/bing_overview2.png)

Given latitude and longitude in degrees, and the level of detail, the pixel XY coordinates can be calculated as follows:

$$
sinLatitude = sin(latitude * pi/180) \\

pixelX = ((longitude + 180) / 360) * 256 * 2^\mathit{level} \\

pixelY = (0.5 – log((1 + sinLatitude) / (1 – sinLatitude)) / (4 * pi)) * 256 * 2\mathit{level}
$$

The latitude and longitude are assumed to be on the WGS 84 datum. Even though Bing Maps uses a spherical projection, it’s important to convert all geographic coordinates into a common datum, and WGS 84 was chosen to be that datum. The longitude is assumed to range from -180 to +180 degrees, and **the latitude must be clipped to range from -85.05112878 to 85.05112878. This avoids a singularity at the poles, and it causes the projected map to be square**.

### 2.4 Tile Coordinates and Quadkeys

To optimize the performance of map retrieval and display, the rendered map is cut into tiles of 256 x 256 pixels each. As the number of pixels differs at each level of detail, so does the number of tiles:

$$
map width = map height = 2^\mathit{level} tiles
$$


Each tile is given XY coordinates ranging from $$(0, 0)$$ in the upper left to $$(2^\mathit{level}–1, 2^\mathit{level}–1)$$ in the lower right. For example, at level 3 the tile coordinates range from $$(0, 0)$$ to $$(7, 7)$$ as follows:

![img](img/bing_overview3.png)

Given a pair of pixel XY coordinates, you can easily determine the tile XY coordinates of the tile containing that pixel:

$$
tileX = floor(pixelX / 256)  \\

tileY = floor(pixelY / 256)
$$

To optimize the indexing and storage of tiles, the two-dimensional tile XY coordinates are combined into one-dimensional strings called quadtree keys, or “quadkeys” for short. Each quadkey uniquely identifies a single tile at a particular level of detail, and it can be used as an key in common database B-tree indexes. To convert tile coordinates into a quadkey, the bits of the Y and X coordinates are interleaved, and the result is interpreted as a base-4 number (with leading zeros maintained) and converted into a string. For instance, given tile XY coordinates of (3, 5) at level 3, the quadkey is determined as follows:

$$
tileX = 3 = 011^2 

tileY = 5 = 101^2 

quadkey = 100111^2 = 2134 = “213”
$$

Quadkeys have several interesting properties. First, the length of a quadkey (the number of digits) equals the level of detail of the corresponding tile. Second, the quadkey of any tile starts with the quadkey of its parent tile (the containing tile at the previous level). As shown in the example below, tile 2 is the parent of tiles 20 through 23, and tile 13 is the parent of tiles 130 through 133:

![img](img/bing_overview4.png)

Finally, quadkeys provide a one-dimensional index key that usually preserves the proximity of tiles in XY space. In other words, two tiles that have nearby XY coordinates usually have quadkeys that are relatively close together. This is important for optimizing database performance, because neighboring tiles are usually requested in groups, and it’s desirable to keep those tiles on the same disk blocks, in order to minimize the number of disk reads.

## 3. Creating tiles with GeoServer using GeoWebCache

Suppose you're satisfied with the layers and symbols in your WMS, but you want it to draw faster and be available to many simultaneous users. In this situation, it might make sense to use GeoWebCache to create your tiles, because GeoWebCache is built directly into GeoServer. This section shows how to use GeoWeb Cache to create a tile cache for the Oregon counties map. 

1\. Start GeoServer at [http://mapio.us/geoserver/](http://mapio.us/geoserver/) and open the GeoServer Web Admin page.

![](img/geoserver-web-admin.png)

2\. Use the **Layer Preview** link to preview the layer `ceoas:ore_counties`. Use the OpenLayers preview so that you can zoom and pan around. Take note of the performance and appearance of the map. 

![](img/ore_counties_preview.png)

3\. In the GeoServer Web Admin page, click the **Tile Layers** link.

![](img/tile_layers.png)

1. Click the **ceoas:ore_counties** link, and scroll down to view the list of layers. This is where you can set up parameters for caching of your layer. If you stopped here, your cache would be created on demand. In our case, we actually want to pregenerate tiles for most of the levels so that they won't need to be built on demand. GeoWebCache calls this "seeding" the cache. , click **Seed/Truncate**.

![ Seed or truncate cache link](img/seed_truncate.png)

6. Scroll down, and fill out the form to create a new task as shown in the image below. Notice that your tile creation task will create PNG images using the Google Maps tiling scheme (900913).

   ![](img/create_new_seed_task.png)

7. At the bottom of the form, click **Submit**. Although you can't see it, your computer is busy drawing your map over and over at different scales. This can tax the computer's memory and CPU resources, and you may see a performance impact on other applications while the caching is occurring. If you want to see your processor at work, open Windows Task Manager and look at the CPU and memory resources being used by java.exe.

8. Every 30 seconds or so, click the **Refresh List** link to see the progress of your cache. When you click this link and the task status disappears, it means your cache is complete.

![ Refresh list](img/refresh_list.png)

9. In the GeoServer Web Admin page, click **Tile Layers** and use the dropdown list to preview your cache in EPSG:900913 using the PNG format (see image below). This time when you pan around, you should see the map appearing instantly. You can verify that the tile cache is being used if the labels do not change position as you pan

![ Preview tiled layer](img/preview_tiled_layer.png)

> **Caution:** Make sure you are using the **Tile Layers** preview and not the **Layer Preview** preview. The Tile Layers preview uses a slightly different URL for the layer that indicates the tile cache should be used. Also, do not worry if the cache is reported on the Tile Layers page as N/A or 0.0 B in size. This seems to be normal, even though you have now built the cache. 

Although performance is improved with the tile cache, you may notice some duplicate labels appearing. This is a difficult problem to avoid with map tiling, because each tile does not "know" about the labels on the adjacent tiles. To mitigate this problem, tile caching software typically draws an area much larger than a tile and then cuts it up into individual tiles. GeoWebCache calls this large area a "metatile" (Esri calls it a "supertile"). If you like, you can experiment with adjusting the metatile size; although duplicate labels can still appear at the metatile boundaries, the duplicates will be fewer and farther between. You may also find that the settings and options in the next walkthrough with TileMill make it easier to get the labeling you want.

## Extended Readings

- Vector Tiles: http://docs.geoserver.org/latest/en/user/extensions/vectortiles/tutorial.html
- 3D Tiles: https://github.com/AnalyticalGraphicsInc/3d-tile

## References:

1. https://www.e-education.psu.edu/geog585/node/706
2. https://msdn.microsoft.com/en-us/library/bb259689.aspx
