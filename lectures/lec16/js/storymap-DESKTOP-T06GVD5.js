// Originally obtained from http://atlefren.github.io/storymap/
// Modified by Bo Zhao, zhao2@oregonstate.edu
// Updated on 2/16/2017
(function ($) {

    // refer to https://www.w3schools.com/js/js_strict.asp
    // "use strict"; Defines that JavaScript code should be executed in "strict mode".
    // The "use strict" directive is new in JavaScript 1.8.5 (ECMAScript version 5).
    // It is not a statement, but a literal expression, ignored by earlier versions of JavaScript.
    // The purpose of "use strict" is to indicate that the code should be executed in "strict mode".
    // With strict mode, you can not, for example, use undeclared variables.
    //'use strict';

    // In jQuery, the fn property is just an alias to the prototype property.
    // The jQuery identifier (or $) is just a constructor function, and all instances created with it, inherit from the constructor's prototype.
    // function Test() {
    //     this.a = 'a';
    // }
    // Test.prototype.b = 'b';
    //
    // var test = new Test();
    // test.a; // "a", own property
    // test.b; // "b", inherited property
    $.fn.storymap = function(options) {

        var defaults = {
            selector: '[data-scene]',
            breakpointPos: '33.333%',
            createMap: function () {
                // create a map in the "map" div, set the view to a given place and zoom
                var map = L.map('map', {zoomControl: false}).setView([44, -120], 7);
                // add an basemap, which can be either OSM, mapbox, tilelayer, wmslayer or those designed by yourself.
                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
                    maxZoom: 18,
                    attribution: '',
                    id: 'mapbox.light'
                }).addTo(map);

                return map;
            }
        };


        var settings = $.extend(defaults, options);

        if (typeof(L) === 'undefined') {
            throw new Error('Storymap requires Laeaflet');
        }

        function getDistanceToTop(elem, top) {
            var docViewTop = $(window).scrollTop();

            var elemTop = $(elem).offset().top;

            var dist = elemTop - docViewTop;

            var d = top - dist;

            if (d < 0) {
                return $(document).height();
            }
            return d;
        }

        function highlightTopPara(paragraphs, top) {

            var distances = $.map(paragraphs, function (element) {
                var dist = getDistanceToTop(element, top);
                return {el: $(element), distance: dist};
            });

            function findMin(pre, cur){
                if (pre.distance > cur.distance) {
                    return cur;
                } else {
                    return pre;
                }
            }

            var closest = distances.reduce(findMin);

            $.each(paragraphs, function (key, element) {
                var paragraph = $(element);
                if (paragraph[0] !== closest.el[0]) {
                    paragraph.trigger('notviewing');
                }
            });

            if (!closest.el.hasClass('viewing')) {
                closest.el.trigger('viewing');
            }
        }

        function watchHighlight(element, searchfor, top) {
            var paragraphs = element.find(searchfor);
            highlightTopPara(paragraphs, top);
            $(window).scroll(function () {
                highlightTopPara(paragraphs, top);
            });
        }

        var makeStoryMap = function (element, scenes) {

            var topElem = $('<div class="breakpoint-current"></div>')
                .css('top', settings.breakpointPos);
            $('body').append(topElem);

            var top = topElem.offset().top - $(window).scrollTop();

            var searchfor = settings.selector;

            var paragraphs = element.find(searchfor);

            paragraphs.on('viewing', function () {
                $(this).addClass('viewing');
            });

            paragraphs.on('notviewing', function () {
                $(this).removeClass('viewing');
            });

            watchHighlight(element, searchfor, top);

            var downBtn = element.find('.arrow-down');

            downBtn.click(function () {
                window.scrollBy(0, $(window).height() / 3);
            });

            var map = settings.createMap();
            var currentLayerGroup = L.layerGroup().addTo(map);

            $.each(paragraphs, function (key, element) {
                var paragraph = $(element);
                if (paragraph[0].className == 'viewing') {
                    var scene = scenes[paragraph[0].attributes['data-scene'].value];
                    map.setView([scene.lat, scene.lng], scene.zoom);
                    var layernames = scene.layers;
                    if(typeof layernames !== 'undefined') {
                        for (var i = 0; i < layernames.length; i++) {
                            currentLayerGroup.addLayer(layers[layernames[i]]);
                        }
                    }
                }
            });

            function showMapView(key) {

                currentLayerGroup.clearLayers();
                var scene = scenes[key];
                var layernames = scene.layers;
                if(typeof layernames !== 'undefined'){
                    for (var i=0; i < layernames.length; i++)
                    {
                        currentLayerGroup.addLayer(layers[layernames[i]]);
                    }
                }

                // if you don't want to show a marker at the center of the map, you can simply comment the following line.
                // currentLayerGroup.addLayer(L.marker([scene.lat, scene.lon]));
                map.setView([scene.lat, scene.lng], scene.zoom, 1);


            }

            paragraphs.on('viewing', function () {
                showMapView($(this).data('scene'));
            });
        };

        makeStoryMap(this, settings.scenes);

        return this;
    }

}(jQuery));
