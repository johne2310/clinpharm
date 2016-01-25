(function () {

    angular
        .module('clinpharm')
        .controller('loginCtrl', loginCtrl);

    //    loginCtrl.$inject = ['$scope', '$rootScope', '$state', '$ionicPopup', 'Auth', 'FURL', 'Utils', '$timeout'];

    function loginCtrl($scope, $rootScope, $state, $ionicPopup, Auth, FURL, Utils) {

        var vm = this;
        vm.login = login;

        // EMAIL & PASSWORD AUTHENTICATION

        // Check for the user's authentication state
        Auth.$onAuth(function (authData) {
            if (authData) {
                $rootScope.loggedInUser = authData;
                console.log('Logged in: ', $rootScope.loggedInUser);
                //                $state.go('tab.home');
            } else {
                $scope.loggedInUser = null;
            }
        });

        // Login an existing user, called when a user submits the login form
        function login(user) {

            console.log('Starting login..');

            Utils.show(); //show loading spinner

            Auth.$authWithPassword({
                email: user.email,
                password: user.password
            }).then(function (authData) {

                $scope.loggedInUser = authData;
                $rootScope.userkey = $scope.loggedInUser.uid;
                console.log('Userkey: ', $rootScope.userkey);

                //now read users node to get name etc and assigned to $rootscope for use across views
                var userRef = new Firebase(FURL + '/users');
                userRef.child(authData.uid).once("value", function (snapshot) {
                    $rootScope.firstname = snapshot.val().firstname;
                    $rootScope.lastname = snapshot.val().lastname;
                    $rootScope.person = snapshot.val().firstname + ' ' + snapshot.val().lastname;
                    $rootScope.userkey = snapshot.key();
                    $rootScope.site = snapshot.val().site;
                    console.log('Site: ', $rootScope.site);
                }, function (error) {
                    Utils.alertshow("Houston we have a problem!", error);
                    console.log('An error has occured getting user data: ', error);
                });
                Utils.hide();
                $state.go('tab.dash');
                //                $timeout(function () {
                //                    $state.go('tab.dash');
                //                }, 500);

            }).catch(function (error) {
                console.log('Error: ', error);
                Utils.hide();
                Utils.alertshow("Houston we have a problem!", error);
            });
        }

    } //end controller

})();



//(function () {
//
//    'Use Strict';
//
//    angular
//        .module('clinpharm')
//        .controller('loginCtrl', loginCtrl);
//
//    loginCtrl.$inject = ['$scope',
//                '$rootScope',
//                '$state',
////                '$cordovaOauth',
//                '$localStorage',
//                '$location',
////                '$http',
//                '$ionicPopup',
//                '$firebaseObject',
//                'Auth',
//                'FURL',
//                'Utils'];
//
//    function loginCtrl(
//        $scope,
//        $rootScope,
//        $state,
//        //        $cordovaOauth,
//        $localStorage,
//        $location,
//        //        $http,
//        $ionicPopup,
//        $firebaseObject,
//        Auth,
//        FURL,
//        Utils) {
//
//        var ref = new Firebase(FURL);
//        var userkey = "";
//        var obj = "";
//
//        $scope.$on('$ionicView.enter', function () {
//
//            console.log('Status = ', Auth.status);
//
//            if (Auth.status === "loggedOut") {
//                obj.$destroy();
//            } else {
//                Auth.status = "";
//            }
//        }); // end $ionicView.enter
//
//
//        $scope.signIn = function (user) {
//
//            console.log("Signing in...");
//            if (angular.isDefined(user)) {
//                Utils.show();
//                Auth.login(user)
//                    .then(function (authData) {
//                        Auth.status = 'loggedIn';
//                        // console.log("User ID" + JSON.stringify(authData));
//
//                        ref.child('users').orderByChild("id").equalTo(authData.uid).on("child_added", function (snapshot) {
//                            // console.log('User key: ', snapshot.key());
//                            userkey = snapshot.key();
//                            obj = $firebaseObject(ref.child('users').child(userkey));
//                            // console.log('Obj: ', obj); //TODO: Remove on clean up
//
//                            obj.$loaded()
//                                .then(function (data) {
//                                    console.log(data === obj); // true
//
//                                    $rootScope.firstname = obj.firstname;
//                                    $rootScope.person = obj.firstname + ' ' + obj.lastname;
//
//                                    $localStorage.email = obj.email;
//                                    $localStorage.userkey = userkey;
//
//                                    $rootScope.email = obj.email;
//                                    $rootScope.userkey = userkey;
//                                    $rootScope.users = authData;
//                                    $rootScope.uid = authData.uid;
//
//                                    console.log('authUID:', $rootScope.uid);
//
//                                    Utils.hide();
//                                    $state.go('tab.dash');
//
//                                })
//                                .catch(function (error) {
//                                    console.error("Error:", error);
//                                });
//                        });
//
//                    }, function (err) {
//                        Utils.hide();
//                        Utils.errMessage(err);
//                    });
//            }
//        };
//    }
//
//})();
