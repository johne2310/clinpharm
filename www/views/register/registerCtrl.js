//registerCtrl.js

(function () {
    'use strict';
    /*global moment */
    /*global Firebase */

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
                    added: moment().format("DD/MM/YYY hh:mm a"),
                    details: false
                });

                //set rootScope variable to pass to UserService factory
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
