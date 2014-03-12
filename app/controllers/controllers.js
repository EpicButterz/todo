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

app.controller('registerController', function($scope, taskService) {
    console.log("you are at the registration page");
    $scope.registerUser = function() {
        var username = $scope.newUser.username;
        var password = $scope.newUser.password;
        console.log("User is " + username);
        taskService.registerUser(username, password);
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