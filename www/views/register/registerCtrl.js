(function () {

    angular
        .module('clinpharm')
        .controller('registerCtrl', registerCtrl);

    function registerCtrl($scope, Auth, $state, $rootScope, Utils) {

        // Create a new user, called when a user submits the signup form
        $scope.register = function (user) {

            Utils.show();

            Auth.$createUser({
                email: user.email,
                password: user.password
            }).then(function () {
                //                console.log('User successfully created');
                Utils.alertshow("Well done!", "The User was Successfully Created.");
                // User created successfully, log them in
                return Auth.$authWithPassword({
                    email: user.email,
                    password: user.password
                });
            }).then(function (authData) {
                $scope.loggedInUser = authData;
                var myUser = new Firebase('https://clinpharm.firebaseio.com' + '/users/' + authData.uid);
                myUser.set({
                    email: authData.password.email,
                    id: authData.uid,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    added: moment().format("DD/MM/YYY"),
                    details: false
                });
                $rootScope.firstname = user.firstname;
                $rootScope.person = user.firstname + ' ' + user.lastname;
                $rootScope.userkey = authData.uid;
                Utils.hide();
                $state.go('tab.account');


            }).catch(function (error) {
                console.log('Error: ', error);
                Utils.hide();
                Utils.alertshow("Houston we have a problem!", error);
            });
        };

        Auth.$onAuth(function (authData) {
            if (authData) {
                $rootScope.loggedInUser = authData;
            } else {
                $scope.loggedInUser = null;
            }
        });

    } //end controller

})();



//(function () {
//    'Use Strict';
//
//    angular
//        .module('clinpharm')
//        .controller('registerCtrl', registerCtrl);
//
//    function registerCtrl($scope, $state, $localStorage, $location, $ionicPopup, $firebaseObject, Auth, FURL, Utils) {
//
//        $scope.register = function (user) {
//            if (angular.isDefined(user)) {
//                Utils.show();
//                Auth.register(user)
//                    .then(function () {
//                        Utils.hide();
//                        console.log("Registration details:" + JSON.stringify(user));
//                        Utils.alertshow("Successfully", "The User was Successfully Created.");
//                        $location.path('/');
//                    }, function (err) {
//                        Utils.hide();
//                        Utils.errMessage(err);
//                    });
//            }
//        };
//    }
//})();
