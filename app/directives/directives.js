app.directive('toggle', function() {
    return {
        scope: {
            toggle: "="
        },
        link: function($scope, element, attrs) {
            $scope.$watch("toggle", function(value) {
                element.toggleClass('active', value)
            });
            element.click(function() {
                $scope.$apply(function() {
                    $scope.toggle = !$scope.toggle
                })
            })
        }
    }
});