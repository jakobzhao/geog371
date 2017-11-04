// import required server side libraries
var twitter = require('twitter'),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

// Twitter API
var twitter_api = new twitter({
        consumer_key: 'knqqNYwjNhtWcMnxpUObvg',
        consumer_secret: 'RREaeKlFwSMNTK98E61DF6MLYJ3aXrsw9BeBAzo',
        access_token_key: '14324013-bdTano7g2a2Tlv69lPdaaAPtn803AQEu4zWFye4OP',
        access_token_secret: 'dD8s6qcJZpt8tTM88cqPRsBlhi210OsRpZNNX4nIc'
    }),

// Twitter data stream object
stream = null;

// Use the default port of Node, otherwise 3000.
server.listen(process.env.PORT || 3000);

// routing
app.use(express.static(__dirname));

//Create web sockets connection.
io.sockets.on('connection', function (socket) {

    socket.on("start tweets", function () {

        if (stream === null) {

            // Twitter API parameters. Search global twitters - 'locations':'-180,-90,180,90'
            // And you can also set up a keyword filter e.g., 'track':'maps'
            twitter_api.stream('statuses/filter', {'locations': '-180,-90,180,90'}, function (stream) {
                stream.on('data', function (data) {
                    // Whether the responding data have coordinates?
                    if (data.coordinates) {
                        if (data.coordinates !== null) {

                            // build a geojson point geometry feature
                            var pntfeature = {
                                "lat": data.coordinates.coordinates[0],
                                "lng": data.coordinates.coordinates[1]
                            };

                            socket.broadcast.emit("twstreaming", pntfeature);

                            // emits the geojson data through the web socket channel.
                            socket.emit('twstreaming', pntfeature);
                        }
                        else if (data.place) {
                            if (data.place.bounding_box === 'Polygon') {
                                // Calculate the center of the polygon
                                var coord, _i, _len;
                                var centerLat = 0;
                                var centerLng = 0;

                                for (_i = 0, _len = coords.length; _i < _len; _i++) {
                                    coord = coords[_i];
                                    centerLat += coord[0];
                                    centerLng += coord[1];
                                }
                                centerLat = centerLat / coords.length;
                                centerLng = centerLng / coords.length;

                                // Build json object and broadcast it
                                var pntfeature = {"lat": centerLat, "lng": centerLng};
                                socket.broadcast.emit("twitter-stream", pntfeature);
                            }
                        }
                    }
                });
            });
        }
    });
    // tell the client they are connected and ready to receive Tweets
    socket.emit("connected");
});