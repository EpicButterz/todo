app.controller('currentController', function($scope) {
    $scope.toggle = {
        display: false
    };
    $scope.tasks = [
        {
            text: "some really important task",
            done: false
        },
        {
            text: "another really important task",
            done: true
        },
        {
            text: "yet another really important task",
            done: false
        }
    ]



});

app.controller('archiveController', function($scope) {
    $scope.tasks = [
        {
            text: "some really important task",
            done: false
        },
        {
            text: "another really important task",
            done: true
        },
        {
            text: "yet another really important task",
            done: false
        }
    ]
});

app.controller('authenticateController', function($scope, $location, $cookies, taskService, socket) {
    $scope.registerUser = function() {
        var firstName = $scope.newUser.firstName;
        var lastName = $scope.newUser.lastName;
        var userEmail = $scope.newUser.userEmail;
        var password = $scope.newUser.password;
        taskService.registerUser(firstName, lastName, userEmail, password);
        socket.on('send user', function(data){
            var userId = data[0]._id;
            $cookies.user = userId;
        });

    };
    $scope.route = function(path) {
        $location.path(path);
    }
});

app.controller('navController', function($scope, $location) {
    $scope.getClass = function(path) {
        if ($location.path().substr(0, path.length) == path) {
            return true
        }else{
            return false;
        }
    }
});