# Lab 4: Publish Web Map Services and Mapbox Basemap

> Winter 2017 | Geography 371 | Geovisualization: Web Mapping
>
> **Instructor:** Bo Zhao  **Location:** Wilkinson 210 | **Time:** Th 1000 - 1150
>
> **Assigned:** 10/19/2017 | **Due:** `11/02/2017 @11:59pm` | **Points Available** = 50


In this lab, you will create a web map service (wms) and web feature service. In the meantime, you will publish a base map using Mapbox.

## 1. Create wms and wfs using GeoServer

1\.1 A shapefile named after `ore_counties` was stored in the `assets` folder. You will use this data set to make web map services on GeoServer. Synchronize the data to your working space.

1\.2 Use `ore_counties` shapefile to make a `layer` on GeoServer. If you met any questions, please refer to the lecture notes of the map server seires or GeoServer's documentation.

1\.3 If you are using a GeoServer on a local computer or the ones in Digital Earth Lab, the url of GeoServer should be http://localhost:8080/geoserver by default. Also, the default username is `admin`, the password is `geoserver`.

1\.4 In the main page of GeoServer, click on the `Layer Preview` under the Data tab. An table of the layer will show up. In this table, please identify the layer you have created, and then click on the `Select one` dropdown menu. In this menu, you will need to generate two services.

![](img/wms-wfs.png)

- Once you click on the `PNG` under the WMS category, a new tab will be created, and please record this url and also save the map tile.

- Also, by click on the ``GeoJson` under the WFS category, you will navigate to a new tab with a raw geojson data. Please record the url and save the geojson data in the name of ore_counties.geojson.

## 2\. Create a base map using Mapbox


2\.1 You are expected to generate a base map using mapbox. **Please make sure you design a base map rather than a thematic map**. The base map is created for illustrating the contextual information of your study area. In the end, the base map will help you to stand out the thematic layers.

2\.2 you are expected to design your map to embody a specifc theme. For example,

- a base map design motivated by a keyword. (refer to [http://palettr.com/](http://palettr.com/));
- a base map design inspired by a picture. (refer to [https://coolors.co/](https://coolors.co/));
- a base map design for color blindness. (refer to [https://coolors.co/](https://coolors.co/));
- a high contrast map (refer to [http://colorpalettes.net/](http://colorpalettes.net/)); and
- a base map design embodying an idea, such as Christmas map, St Patrick Map, LGBT map, Beaver Nation Map, etc.

2\.3 Once you made the map, please use a leaflet web page to call this map. The tutorial is in the lecture note on [Wednesday](../../lectures/lec13/). Eventually, you will have a github repo to manage all the files. The mapbox basemap will be shown on an `index.html`. (we will talk about the structure of the github repository in the deli)


## 3\. Deliverable

You will have two weeks to work on this lab. To submit, please follow the steps below.

3\.1 create a github repository. This repository will store the files of the Geosever wms and wfs data, and mapbox base map web page.  **Note:** Regarding the name of this github repo, please use something related to your base map, rather than `lab04`, `assignment04`, and etc.  (**3 POINTS**)

3\.2 In the readme.md file, please paste the wms url and the screenshot of the responding png image. (**4 POINTS**)

3\.3 In the readme.md, please also past the wfs url, and make an link to the downloaded `ore_counties.geojson` geojson data in your `assets` file. (**4 POINTS**)

3\.4 In the readme.md, please add a link to show your mapbox basemap web page. Basically, By clicking on the link, a new web page tab will be opened up to show the base map (you will need to turn the github page function on). This web page should be the `index.html` of this github repository. In terms of the github repository  structure, please refer to [lecture 13](../../lectures/lec13/). (**20 POINTS**)

3\.5 In the readme.md, reflect on your design process - How did you determine the current web map style?  What specific topic motivate you to design the map? For example, you can design a map driven by a LGBT topic (I guess the geometric features on the map will be in a rainbow color ramp), or driven by the idea of Beaver Nation (Orange and Black?).  (**10 POINTS**)

3\.6 Share your mapbox to mapbox design gallary. Check out the other great designs in the Mapbox Studio [map design gallery](https://www.mapbox.com/gallery/). (**4 POINTS**)

![studio-editor](https://www.mapbox.com/help/img/screenshots/gallery.gif)

Fill out our [contact form](https://www.mapbox.com/contact/sales/), including a style URL and screenshot of your map or app and Mapbox team will look into adding it to their gallery. Mapbox would like to show case of some interesting map design and applications.

![](img/submit.png)

3\.7 The structure of the github repository should like something below. (**5 POINTS**)

```Powershell
[Submission_Lab_04]
│readme.md
│index.html
├─assets
│      icons
│            xxx.svg
│            xxx.svg
│            xxx.svg
│      style.json
│      ore_counties.geojson
│      license.txt
├─img
│      screenshot.png
```


To submit this practical exercise, you will need to submit the url of the GitHub repository to **Canvas Dropbox**. On the assignment tab,  check the item of this PE, press the `Submit Assignment` button to submit your PE report. Please contact the instructor or TA if you have any difficulty.
