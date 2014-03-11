var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    path = require('path'),
    io = require('socket.io').listen(server),
    mongoose = require('mongoose');

// Static Assets
app.use('/app/', express.static(path.join(__dirname, '/app')));
app.use('/content/', express.static(path.join(__dirname, '/content')));
app.use('/scripts/', express.static(path.join(__dirname, '/scripts')));

// Create Server
server.listen(3000);

mongoose.connect('mongodb://localhost/collection', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to mongodb!');
    }
});

// Create Schema
var schemaName = mongoose.Schema({
    object: String
});

var schema = mongoose.model('schema', schemaName);

// Route to index
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    // socket connections go here
});