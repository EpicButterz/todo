app.controller('currentController', function($scope, $cookies, taskService, socket) {
    var userId = $cookies.user;

    $scope.toggle = {
        display: false
    };
    socket.on('get tasks', function(data) {
        $scope.tasks = data;
    });
    taskService.sendUserId(userId);
    $scope.addTask = function() {
        var taskText = $scope.taskText;
        taskService.addTask(taskText, userId);
        $scope.tasks.push({text:$scope.taskText});
        $scope.taskText = " ";
    };

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
    $scope.login = function() {
        var userEmail = $scope.user.userEmail;
        var password = $scope.user.password;
        taskService.login(userEmail, password);

        socket.on('logged in', function(data) {
            console.log(data._id);
            $cookies.user = data[0]._id;
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