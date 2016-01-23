(function () {
    'Use Strict';

    angular.module('clinpharm')
        .controller('forgotCtrl', forgotCtrl);


    function forgotCtrl($scope,
        $state,
        //        $cordovaOauth,
        //        $localStorage,
        $location,
        //        $http,
        $ionicPopup,
        //        $firebaseObject,
        Auth
        //        FURL,
        //        Utils
    ) {

        //        var ref = new Firebase(FURL);
        $scope.resetpassword = function (user) {
            if (angular.isDefined(user)) {
                Auth.resetpassword(user)
                    .then(function () {
                        console.log("Password reset email sent successfully!");
                        $location.path('/login');
                    }, function (err) {
                        console.error("Error: ", err);
                    });
            }
        };
    }
})();
