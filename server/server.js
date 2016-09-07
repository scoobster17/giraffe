/**
 * Server config for Giraffe graph generating app
 */

/* DEPENDENCIES */

var express = require('express');

/* ************************************************************************** */

/* APP SETUP */

var app = express();

app.use( express.static(__dirname + "/../app") );

// re-directs for when page is refreshed
// these need to somehow go to routes on reload if possible?
/*app.get('/home', function(req, res) {
    res.redirect('/');
});*/

/* ************************************************************************** */

/* SERVER */

var server = app.listen(6174, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Giraffe app listening @ http://%s:%s", host, port);

});
