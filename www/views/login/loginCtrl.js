(function () {

    'Use Strict';

    angular
        .module('clinpharm')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope',
                '$rootScope',
                '$state',
//                '$cordovaOauth',
                '$localStorage',
                '$location',
//                '$http',
                '$ionicPopup',
                '$firebaseObject',
                'Auth',
                'FURL',
                'Utils'];

    function loginCtrl(
        $scope,
        $rootScope,
        $state,
        //        $cordovaOauth,
        $localStorage,
        $location,
        //        $http,
        $ionicPopup,
        $firebaseObject,
        Auth,
        FURL,
        Utils) {

        var ref = new Firebase(FURL);
        var userkey = "";
        var obj = "";

        $scope.$on('$ionicView.enter', function () {

            console.log('Status = ', Auth.status);

            if (Auth.status === "loggedOut") {
                obj.$destroy();
            } else {
                Auth.status = "";
            }
        }); // end $ionicView.enter


        $scope.signIn = function (user) {

            console.log("Signing in...");
            if (angular.isDefined(user)) {
                Utils.show();
                Auth.login(user)
                    .then(function (authData) {
                        Auth.status = 'loggedIn';
                        // console.log("User ID" + JSON.stringify(authData));

                        ref.child('users').orderByChild("id").equalTo(authData.uid).on("child_added", function (snapshot) {
                            // console.log('User key: ', snapshot.key());
                            userkey = snapshot.key();
                            obj = $firebaseObject(ref.child('users').child(userkey));
                            // console.log('Obj: ', obj); //TODO: Remove on clean up

                            obj.$loaded()
                                .then(function (data) {
                                    console.log(data === obj); // true

                                    $rootScope.firstname = obj.firstname;
                                    $rootScope.person = obj.firstname + ' ' + obj.lastname;

                                    $localStorage.email = obj.email;
                                    $localStorage.userkey = userkey;

                                    $rootScope.email = obj.email;
                                    $rootScope.userkey = userkey;
                                    $rootScope.users = authData;
                                    $rootScope.uid = authData.uid;

                                    console.log('authUID:', $rootScope.uid);

                                    Utils.hide();
                                    $state.go('tab.dash');

                                })
                                .catch(function (error) {
                                    console.error("Error:", error);
                                });
                        });

                    }, function (err) {
                        Utils.hide();
                        Utils.errMessage(err);
                    });
            }
        };
    }

})();
