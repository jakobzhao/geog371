# Lab 4: Web Map Services and Basemap

> Winter 2018 | Geography 371 | Web Mapping
>
> **Instructor:** Bo Zhao  **Location:** Wilkinson 210 | **Time:** Th 0800 - 1150
>
> **Assigned:** Feb 6, 2019  | **Due:** Feb 18, 2019. 11:59pm  | **Points Available** = 50

In this lab, you are expected to make a **base map** using MapBox. **Please make sure you design a base map rather than a thematic map**. The base map is created for illustrating the contextual information of your study area, it will help you to stand out the thematic layers. The base map  shuold embody a specific theme. Check [mapbox gallery]((https://www.mapbox.com/gallery/)) to learn from other web cartographers' work. Since the use of color is a major task for a web map, you can get a color theme (a series of color are included) using the methods I mentioned below,

- using a keyword. (refer to [http://palettr.com](http://palettr.com/));
- using a picture. (refer to [https://coolors.co](https://coolors.co/));
- color blindness. (refer to [https://coolors.co](https://coolors.co/)); or
- a high contrast color theme (refer to [http://colorpalettes.net](http://colorpalettes.net/)).

A base map design embodying an idea, such as Christmas map, St. Patrick Map, Beaver Nation, refugee camp, etc.

Once you made the base map using mapbox, please use a leaflet web page to call this map. The tutorial is in the lecture note on [this](../../lectures/lec13/). Eventually, you will have a github repo to manage all the files. The mapbox basemap will be shown on an `index.html`.

## Deliverable

You will have one and a half weeks to work on this lab. To submit, please follow the steps below.

1\. create a github repository. This repository will host the base map which you designed by Mapbox.    (**5 POINTS**)

> **Note:** Regarding the name of this github repo, please use something related to your base map, names like `lab04`, `assignment04` are not recommended.


2\. In the readme.md, please add a link (the link should be in the format of `http://[github_username].github.io/[submissio_lab_04]`) to access the web page of the mapbox basemap. This web page to access the base map should be the `index.html` of this github repository. Basically, By clicking on the link, the base map hosted by this github repository will show. Refer to [lecture 13](../../lectures/lec13/) to see a tutorial. (**30 POINTS**)


3\. In the readme.md, reflect on your design process - How did you determine the current web map style?  What specific topic motivate you to design the map? For example, you can design a map driven by the idea of Beaver Nation, the primary colors should be Orange and Black.  (**10 POINTS**) At last, if you want to share you map to mapbox gallery, please Tweet it with #BuiltWithMapbox to submit it to the gallery.


4\. The structure of the github repository should like something below. (**5 POINTS**)

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


####Optional Task

If you design a map representing a LGBT :rainbow:  topic or a Valentine's Day :heart: topic, you will receive the addtional points (**5 POINTS**). Think out aloud, what color ramp is appropriate for a LGBT theme? Like a rainbow color flag ?

Once you complete this lab assignment, please make sure both the github repository and the web site work appropriately. Then, you will need to submit the url of the GitHub repository to **Canvas Dropbox**. (On the assignment tab,  press the `Submit Assignment` button to submit. Please contact the instructor or TA if you have any difficulty.)

## References:

[1] Walton, Amy Lee 2017 [MapBox Design Guide](https://www.mapbox.com/resources/guide-to-map-design-part-1a.pdf), Mapbox, retrieved at Feb 5, 2019.
