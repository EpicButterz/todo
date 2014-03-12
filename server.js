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

// Connect to DB
mongoose.connect('mongodb://localhost/todo', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to mongodb!');
    }
});

// Create Schema
var taskSchema = mongoose.Schema({
    text: String,
    done: {type: Boolean, default: false}
});
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    tasks: {
        text: String,
        done: {type: Boolean, default: false}
    }
});

var task = mongoose.model('tasks', taskSchema);
var user = mongoose.model('users', userSchema);

io.sockets.on('connection', function (socket) {
    var query = task.find({});

    // Add user
    socket.on('register user', function(data) {
        var newUser = new user({ 
            username: data.username,
            password: data.password,
            tasks: {
                text: "a new task",
                done: true
            }
        });
        newUser.save();
    });
    // Display Tasks
    query.exec(function (err, docs) {
        if (err) throw err;
        socket.emit('load tasks', docs);
    });

    // Receive tasks
    socket.on('send task', function (data) {
        var newTask = new task({text: data});
        newTask.save(function (err) {
            if (err) throw err;
        });
    });

    // Mark as done
    socket.on('mark task', function(data) {
        console.log("mark task " + data._id);
        task.findOneAndUpdate({ _id: data._id}, { done: !data.done }).exec();
    });

    // Remove tasks
    socket.on('remove task', function(taskId) {
        task.find({ _id:taskId }).remove().exec();
    });
});