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

// Route to index
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});



/////////////////////////////////////////////////////////////////////////////
////                                Database                             ////
/////////////////////////////////////////////////////////////////////////////
// Connect to DB
mongoose.connect('mongodb://localhost/todo', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to mongodb!');
    }
});

// Create Schema
var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
},
    { strict: false }
);

var user = mongoose.model('users', userSchema);

io.sockets.on('connection', function (socket) {

    // Add user
    socket.on('register user', function(data) {
        var newUser = new user({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        });
        newUser.save();
    });
});