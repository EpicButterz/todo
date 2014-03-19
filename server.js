var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    path = require('path'),
    io = require('socket.io').listen(server),
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID,
    format = require('util').format,
    server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
    server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    socket = io.connect("http://http://todo-butterz.rhcloud.com:8000");

// Static Assets
app.use('/app/', express.static(path.join(__dirname, '/app')));
app.use('/content/', express.static(path.join(__dirname, '/content')));
app.use('/scripts/', express.static(path.join(__dirname, '/scripts')));

// Create Server
server.listen(server_port, server_ip_address, function() {
    console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});

// Route to index
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.set('transports', [
    'websocket'
    , 'flashsocket'
    , 'htmlfile'
    , 'xhr-polling'
    , 'jsonp-polling'
]);

/////////////////////////////////////////////////////////////////////////////
////                                Database                             ////
/////////////////////////////////////////////////////////////////////////////

// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/todo';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

MongoClient.connect('mongodb://' + connection_string, function(err, db) {
    if(err) throw err;
    console.log("connected to mongodb!");
    var userCollection = db.collection('users');
    var taskCollection = db.collection('tasks');

    io.sockets.on('connection', function (socket) {

        // send tasks
        socket.on('send user id', function(userId) {
            taskCollection.find({ user: userId }).toArray(function(err, docs){
                    if(err) throw err;
                    socket.emit('get tasks', docs);
                }
            );
        });

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

        // User Login
        socket.on('login user', function(data) {
            console.log('login server');
            userCollection.find({ email: data.email, password: data.password }).toArray(function(err, docs) {
                if(err) throw err;
                console.log('found user! server');
                socket.emit('logged in', docs);
            });
        });

        // Add Task
        socket.on('add task', function(data) {
            taskCollection.insert(
                {
                    user: data.user,
                    text: data.text,
                    done: data.done
                },
                function(err) {
                    if(err) throw err;
                }
            );
        });



    });
});