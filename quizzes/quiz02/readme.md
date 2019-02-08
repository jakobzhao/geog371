# Quiz 2: Create GeoJson

For this quiz, you will need to look for a shapefile and convert it to geojson. You can refer to the lecture on spatial data to review how to convert a shapefiel to geojson. Please make sure the geojson is in the correct projection (wgs84, epsg: 4326). In addition, you might want to use [mapshaper](https://mapshaper.org/) to simplify a geojson. Please follow the steps below:

[1] Convert the raw geospatial data (in shapefile) as a geojson; and

[2] Simplify this geojson as a new geojson data


In the readme.md file of this repo, please briefly introduce this data, and also make a table to compare the data size of these three (geo/topo)-json files. for example:

name	size(kb)
xxx.geojson	10,000
xxx_simplifed.geojson	1,000


In the assets folder of this repo, please upload the two json files.  So, the structure of this repository should be: 


```powershell
[your_repository_name]
    │readme.md
    ├─assets
    │      XXX.geojson 
    │      XXX_simplified.geojson
    │      XXX.topojson
```


Please only submit the url of this repository to canvas.
