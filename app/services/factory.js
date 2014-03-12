app.factory('socket', function ($rootScope) {
    var socket = io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});

app.service('taskService', function(socket) {
    console.log("made it to the service!");
    this.registerUser = function(username, password) {
        console.log("u: " + username + "p: " + password);
        var newUser = {
            username: username,
            password: password
        };
        socket.emit('register user', newUser);
    };
});