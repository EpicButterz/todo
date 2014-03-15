var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    path = require('path'),
    io = require('socket.io').listen(server),
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID,
    format = require('util').format;

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

MongoClient.connect('mongodb://127.0.0.1:27017/todo', function(err, db) {
    if(err) throw err;
    console.log("connected to mongodb!");
    var userCollection = db.collection('users');
    var taskCollection = db.collection('tasks');

    io.sockets.on('connection', function (socket) {
        // Add user
        socket.on('register user', function(data) {
            userCollection.insert({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password
            }, function(err, docs) {
                if(err) throw err;
                socket.emit('send user', docs);
            });
        });

        // Add Task
        socket.on('add task', function(data) {
            taskCollection.update(
                { _id: ObjectId("53231ec55d52734419fd1441") },
                {$set: {text: "Yet another task", done: true}},
                function(err){
                    if(err) throw err;
                    var id = ObjectId().toString();
                    console.log(id);
            });
        });
    });

});

//
//mongoose.connect('mongodb://localhost/todo', function (err) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log('Connected to mongodb!');
//    }
//});
//
//// Create Schema
//var userSchema = mongoose.Schema({
//    firstName: String,
//    lastName: String,
//    email: String,
//    password: String
//},
//    { strict: false }
//);
//
//var user = mongoose.model('users', userSchema);
//
//io.sockets.on('connection', function (socket) {
//
//    // Add user
//    socket.on('register user', function(data) {
//        var newUser = new user({
//            firstName: data.firstName,
//            lastName: data.lastName,
//            email: data.email,
//            password: data.password
//        });
//        newUser.save();
//    });
//});