(function () {

    angular
        .module('clinpharm')
        .controller('activityCtrl', activityCtrl);

//    activityCtrl.$inject = ['$scope', 'ActivityService', '$rootScope'];

    function activityCtrl($scope, ActivityService, $rootScope) {

        var vm = this;

        vm.addActivity = addActivity;
        vm.activities = ActivityService;

        $scope.activities = ActivityService;

        $scope.addActivity = function (activity) {

            ActivityService.$add({
                type: activity.type,
                date: new Date(),
                pharmacist: $rootScope.firstname,
                pharmacistId: $rootScope.userkey
            });
            activity.type = "";
            console.log('Message added');

        };
    }

})();
