(function () {
    'Use Strict';

    angular
        .module('clinpharm')
        .controller('registerCtrl', registerCtrl);

    function registerCtrl($scope, $state, $localStorage, $location, $ionicPopup, $firebaseObject, Auth, FURL, Utils) {

        $scope.register = function (user) {
            if (angular.isDefined(user)) {
                Utils.show();
                Auth.register(user)
                    .then(function () {
                        Utils.hide();
                        console.log("Registration details:" + JSON.stringify(user));
                        Utils.alertshow("Successfully", "The User was Successfully Created.");
                        $location.path('/');
                    }, function (err) {
                        Utils.hide();
                        Utils.errMessage(err);
                    });
            }
        };
    }
})();
