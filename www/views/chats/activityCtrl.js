(function () {

    angular
        .module('clinpharm')
        .controller('activityCtrl', activityCtrl);

    //    activityCtrl.$inject = ['$scope', 'vm.activities', '$rootScope'];

    function activityCtrl($scope, $rootScope) {

        var vm = this;

        vm.addActivity = addActivity;
        vm.activities = vm.activities;

        $scope.activities = vm.activities;

        $scope.addActivity = function (activity) {

            vm.activities.$add({
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
