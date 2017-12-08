(function () {

    function defineSnogylop(L) {

        var worldLatlngs = [
            L.latLng([90, 180]),
            L.latLng([90, -180]),
            L.latLng([-90, -180]),
            L.latLng([-90, 180])
        ];

        L.extend(L.Polygon.prototype, {

            initialize: function (latlngs, options) {
                worldLatlngs = (options.worldLatLngs ? options.worldLatLngs : worldLatlngs);

                if (options && options.invert && !options.invertMultiPolygon) {
                    // Create a new set of latlngs, adding our world-sized ring
                    // first
                    var newLatlngs = [];
                    newLatlngs.push(worldLatlngs);
                    newLatlngs.push(latlngs[0]);
                    latlngs = newLatlngs;
                }

                L.Polyline.prototype.initialize.call(this, latlngs, options);
                this._initWithHoles(latlngs);
            },

            getBounds: function () {
                if (this.options.invert) {
                    // Don't return the world-sized ring's bounds, that's not
                    // helpful!
                    return new L.LatLngBounds(this._holes);
                }
                return new L.LatLngBounds(this.getLatLngs());
            },

            _initWithHoles: function (latlngs) {
                var i, len, hole;
                if (latlngs && L.Util.isArray(latlngs[0]) && (typeof latlngs[0][0] !== 'number')) {
                    this._latlngs = this._convertLatLngs(latlngs[0]);
                    this._holes = latlngs.slice(1);

                    for (i = 0, len = this._holes.length; i < len; i++) {
                        hole = this._holes[i] = this._convertLatLngs(this._holes[i]);
                        if (hole[0].equals(hole[hole.length - 1])) {
                            hole.pop();
                        }
                    }
                }

                // filter out last point if its equal to the first one
                latlngs = this._latlngs;

                if (latlngs.length >= 2 && latlngs[0].equals(latlngs[latlngs.length - 1])) {
                    latlngs.pop();
                }
            }

        })

    }

    if (typeof define === 'function' && define.amd) {
        // Try to add snogylop to Leaflet using AMD
        define(['leaflet'], function (L) {
            defineSnogylop(L);
        });
    }
    else {
        // Else use the global L
        defineSnogylop(L);
    }

})();
