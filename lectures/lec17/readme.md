# Storytelling with Web Map I

> Fall 2017 | Geography 371 | Geovisualization: Web Mapping
>
> Instructor: Bo Zhao | Location: Wilkinson 235 | Time: MWF 1200 to 1250

**Learning Objectives**

- How to make an appealing story map; and
- Code a web based story map from scratch.

<img src="https://github.com/jakobzhao/storymap/raw/master/img/logo.png" height="15%" width="15%" align="left"/> Narratology can improve our ability to communicate with maps. The recent convergence of web, communication, and geospatial technologies has brought new opportunities and challenges to improve map. Especially, digital storytelling has transcended traditional geovisualization of scientific data and provided a narrative complement to geospatial representation and analytics. In the meantime, continuous efforts have been devoted to supplementing the quantitative research method with a qualitative or mixed alternative, enriching theories and methodologies and prioritizing place-based, open GIS. Confronted with this status quo in Cartography and GIS, digital storytelling with web maps (also known as story mapping or geo-narrative) has been recognized as an effective way to narrate and further qualitatively examine different places of interests. During the past decade, digital storytelling with maps has moved beyond the handful of popular, proprietary story map frameworks, and yet the wider development of story maps has been hindered by several obvious obstacles. Specifically, most story map frameworks alleged themselves to be free and open source, but the applications are frequently built using frameworks that only function with specified cyberinfrastructures and web mapping services; such resources are usually not free, and are further impeded by data storage and/or access rate limitations. So, a framework that enables a wider community to learn, make, and use story map does not exist. Also, since most proprietary story map frameworks usually stick to one or several archetypal storytelling structures, we still lack a framework which engages and integrates the verity of storytelling structures in all their diversity, as interpreted by the narratology theories. The comprehensive range of different topics on story maps is unknown.

The intellectual merit lies in its potential to transform research and teaching in geography and related fields by integrating the humanities into digital storytelling with web mapping techniques. Digital storytelling enables us to identify and formalize spatial problems, facilitate problem solving, and to craft and tell richer stories. Digital storytelling has transcended mere geovisualization and provided a narrative alternative to exploring qualitative geospatial data. By applying the new open concept for this proposed framework, the open source storymap library can be easily reproduced as new story map applications, and the open knowledge base enables students, journalists, and any individual who are interested in story maps to learn how to make story map step by step. This open framework sheds new light on the theoretical transitions from space to place-based GIS, from geospatial data visualization to narrative, from proprietary to open GIS. This project contributes geographic methods by providing a means to explore and analyze geospatial data with qualitative approaches.

The broader impacts lie with its potential to unlock unprecedented possibilities to extend visual representations of the earth, society and human experience through digital storytelling. The proposed framework will provide an open source library for making story maps, lead the way for open cyberinfrastructures to host story maps over the Internet, and begin building a knowledge base on novel forms of story maps. In addition, story map is a strong constructivist pedagogical tool for educational uses. It offers educators the ability to teach students to synthesize both quantitative and the qualitative geospatial data, and to think critically, spatially, and at the same time, attention to the Humanities. To promote the use of the proposed framework, the PIs will work with volunteers, researchers and students to create story map demos of different topics. We also anticipate our inter-disciplinary collaboration among PIs will inspire the next generation of cartographer, GIScientists as well as other social scientists to solve spatial problems and explore many fascinating geographic phenomena using storytelling.

**Major Map Story Websites**

1. https://storymaps.arcgis.com/en/app-list/

2. https://storymap.knightlab.com/

3. https://cartodb.github.io/odyssey.js/

4. http://atlefren.github.io/storymap/

## 1. Storytelling Structure

Map Story are organized by scenes/actions/plots. scene refers to the sequence of events inside a story which affect other events through the principle of cause and effect. The causal events of a scene can be thought of as a series of sentences linked by "and so". Scenes can vary from simple structures such as in a traditional ballad to complex interwoven structures sometimes referred to as an imbroglio. The term scene can serve as a verb and refer to a character planning future actions in the story.

> **Aristotle** considered scene (mythos) the most important element of drama—more important than character, for example. A scene must have, Aristotle says, a beginning, a middle, and an end, and the events of the scene must causally relate to one another as being either necessary or probable.

In 1863, Gustav Freytag, a German writer, advocated a model based upon Aristotle's theory of tragedy. This is now called "Freytag's pyramid," which divides a drama into five parts, and provides function to each part. These parts are: exposition, rising action, climax, falling action, and denouement.

<img src="img/Freytags_pyramid.svg.png" height="30%" width="30%" align="right"/>

**Exposition**

The first phase in Freytag's pyramid is the exposition, which introduces the characters, especially the main character, also known as the protagonist. It shows how the characters relate to one another, their goals and motivations, as well as their moral character. During the exposition, the protagonist learns their main goal and what is at stake.

**Conflict**

Freytag's definition of conflict refers to the second act in a five-act play, a point of time in which all of the major characters have been introduced, their motives and allegiances have been made clear, and they have begun to struggle against one another.

**Rising action**

Rising action is the second phase in Freytag's five-phase structure. It starts with a conflict, for example, the death of a character. The inciting incident is the point of the scene that begins the conflict. It is the event that catalyzes the protagonist to go into motion and to take action. Rising action involves the buildup of events until the climax.

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

Please turn to [https://github.com/jakobzhao/storymap](https://github.com/jakobzhao/storymap). We will go over a tutorial on how to make a storymap based on this library.

## Reference

1\. [https://en.wikipedia.org/wiki/Plot_(narrative)](https://en.wikipedia.org/wiki/Plot_(narrative))

2\. [https://github.com/jakobzhao/storymap](https://github.com/jakobzhao/storymap)

2\. [http://atlefren.github.io/storymap/](http://atlefren.github.io/storymap/)
