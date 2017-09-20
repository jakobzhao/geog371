# Thematic Web Maps III: Map Story Telling

> Fall 2017 | Geography 371 | Geovisualization: Web Mapping
>
> Instructor: Bo Zhao | Location: Wilkinson 235 | Time: MWF 1200 to 1250

**Learning Objectives**

- How to make an appealing story map; and
- Code a web based story map from scratch.

A story map is a strategy that uses a graphic organizer to learn the elements of a book or story. By identifying story characters, plot, setting, problem and solution, students read carefully to learn the details. There are many different types of story map graphic organizers. The most basic focus on the beginning, middle, and end of the story. More advanced organizers focus more on plot or character traits. Story maps is a framework for identifying the elements of a story and help you organize information and ideas efficiently.

**Major Map Story Websites**

1. https://storymaps.arcgis.com/en/app-list/
2. https://storymap.knightlab.com/
3. https://cartodb.github.io/odyssey.js/
4. http://atlefren.github.io/storymap/

## 1. Story Plots

Map Story are organized by plots. Plot refers to the sequence of events inside a story which affect other events through the principle of cause and effect. The causal events of a plot can be thought of as a series of sentences linked by "and so". Plots can vary from simple structures such as in a traditional ballad to complex interwoven structures sometimes referred to as an imbroglio. The term plot can serve as a verb and refer to a character planning future actions in the story.

> **Aristotle** considered plot (mythos) the most important element of drama—more important than character, for example. A plot must have, Aristotle says, a beginning, a middle, and an end, and the events of the plot must causally relate to one another as being either necessary or probable.

In 1863, Gustav Freytag, a German writer, advocated a model based upon Aristotle's theory of tragedy. This is now called "Freytag's pyramid," which divides a drama into five parts, and provides function to each part. These parts are: exposition, rising action, climax, falling action, and denouement.

![](img/Freytags_pyramid.svg.png)

**Exposition**

The first phase in Freytag's pyramid is the exposition, which introduces the characters, especially the main character, also known as the protagonist. It shows how the characters relate to one another, their goals and motivations, as well as their moral character. During the exposition, the protagonist learns their main goal and what is at stake.

**Conflict**

Freytag's definition of conflict refers to the second act in a five-act play, a point of time in which all of the major characters have been introduced, their motives and allegiances have been made clear, and they have begun to struggle against one another.

**Rising action**

Rising action is the second phase in Freytag's five-phase structure. It starts with a conflict, for example, the death of a character. The inciting incident is the point of the plot that begins the conflict. It is the event that catalyzes the protagonist to go into motion and to take action. Rising action involves the buildup of events until the climax.

In this phase, the protagonist understands his or her goal and begins to work toward it. Smaller problems thwart their initial success and their progress is directed primarily against these secondary obstacles. This phase demonstrates how the protagonist overcomes these obstacles.

**Climax**

The climax is the turning point or highest point of the story. The protagonist makes the single big decision that defines not only the outcome of the story, but also who they are as a person. Freytag defines the climax as the third of the five dramatic phases which occupies the middle of the story.

At the beginning of this phase, the protagonist finally clears away the preliminary barriers and engages with the adversary. Usually, both the protagonist and the antagonist have a plan to win against the other as they enter this phase. For the first time, the audience sees the pair going against one another in direct or nearly direct conflict.

This struggle usually results in neither character completely winning or losing. In most cases, each character's plan is both partially successful and partially foiled by their adversary. The central struggle between the two characters is unique in that the protagonist makes a decision which shows their moral quality, and ultimately decides their fate. In a tragedy, the protagonist here makes a poor decision or a miscalculation that demonstrates their tragic flaw.

**Falling action**

According to Freytag, the falling action phase consists of events that lead to the ending. Character's actions resolve the problem. In the beginning of this phase, the antagonist often has the upper hand. The protagonist has never been further from accomplishing their goal. The outcome depends on which side the protagonist has put themselves on.

**Resolution**

In this phase the protagonist and antagonist have solved their problems and either the protagonist or antagonist wins the conflict. The conflict officially ends. Some stories show what happens to the characters after the conflict ends and/or they show what happens to the characters in the future.

## 2. Making a web based story map from scratch

Storymap is a jQuery-plugin to create a map that follows your text. Annotate each paragraph and place a map alongside it. Then you can zoom/pan/add marker etc to the map as the reader reads through the text. In this section, we would like to show a demo of a story map about oregon major cities. The demo can be found at [http://mapio.us/wk06_2_lec15/](http://mapio.us/wk06_2_lec15/).

![](img/demo.png)

> This map is inspired by http://atlefren.github.io/storymap/


**Requirements**: Storymap expects some (rather common) js libs to be available:

- jQuery (as it is a jQuery plugin)
- Leaflet (because we need a map)

In addition, the markup is based on Bootstrap 3.

**Codes**

Setup a html page like the one in index.html, include dependencies and do a

```js
el.storymap({scenes: dict_with_data});
```

on the element you wish to add a storymap to. By default, the plugin looks for elements that has a "data-place" attribute, sets the breakpoint 33% from the top of the page. This can be overridden by setting some options, like this:

```js
el.storymap({
    scenes: dict_with_data,
    selector: '[data-place]', //jquery for selectors to trigger an event
    breakpointPos: '33.333%', //position of the breakpoint
    createMap: function () { //function that creates a map
        // create a map in the "map" div, set the view to a given place and zoom
        var map = L.map('map').setView([65, 18], 5);
        // add an OpenStreetMap tile layer
        L.tileLayer(
            'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
        ).addTo(map);
        return map;
    }
});
```

Enrich the story line.

```js
var layers = {
    'bing' : L.tileLayer.bing('AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L'),
    'counties': L.geoJson(oregonData)
};

var scenes = {
    overview: {lat: 44.2514788, lon: -120.3869201, zoom: 6},
    portland: {lat: 45.5186089, lon: -122.6270297, zoom: 11},
    corvallis: {lat: 44.5701158, lon: -123.2749388, zoom: 14, layer:layers['bing']},
    eugene: {lat: 44.0549563, lon: -123.0758048, zoom: 13,  },
    salem: {lat: 44.9419055, lon: -123.0356407, zoom: 13},
    bend: {lat: 44.0519385, lon: -121.3042125, zoom: 14, layer:layers['bing']},
    oregon: {lat: 44.2514788, lon: -120.3869201, zoom: 6, layer:layers['counties']}
};

$('.main').storymap({
    scenes: scenes
});
```

## Reference

1\. [https://en.wikipedia.org/wiki/Plot_(narrative)](https://en.wikipedia.org/wiki/Plot_(narrative))

2\. [http://atlefren.github.io/storymap/](http://atlefren.github.io/storymap/)