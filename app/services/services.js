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

    this.registerUser = function(firstName, lastName, userEmail, password) {
        var newUser = {
            firstName: firstName,
            lastName: lastName,
            email: userEmail,
            password: password
        };
        socket.emit('register user', newUser);
    };
});