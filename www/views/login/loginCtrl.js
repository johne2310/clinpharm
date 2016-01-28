(function () {

    angular
        .module('clinpharm')
        .controller('loginCtrl', loginCtrl);

    function loginCtrl($scope, $rootScope, $state, $ionicPopup, Auth, FURL, Utils, $timeout, $localStorage) {

        var vm = this;
        vm.login = login;
        var myUser = {};

        $rootScope.firstname = '';
        $rootScope.userkey = '';
        $rootScope.person = '';

        // EMAIL & PASSWORD AUTHENTICATION


        console.log('Auth is: ', Auth);
        // Check for the user's authentication state
        Auth.$onAuth(function (authData) {
            if (authData) {
                $rootScope.loggedInUser = authData;
                console.log('Logged in from onAuth: ', $rootScope.loggedInUser);
                //                $state.go('tab.home');
            } else {
                $scope.loggedInUser = null;
                console.log('User is logged off.');
            }
        });

        // Login an existing user, called when a user submits the login form
        function login(user) {

            Utils.show(); //show loading spinner

            Auth.$authWithPassword({
                email: user.email,
                password: user.password
            }).then(function (authData) {

                $scope.loggedInUser = authData;
                $rootScope.userId = $scope.loggedInUser.uid;

                myUser.userkey = $scope.loggedInUser.uid;

                //now read users node to get name etc and assigned to $rootscope for use across views
                var userRef = new Firebase(FURL + '/users');
                userRef.child(authData.uid).once("value", function (snapshot) {
                    $rootScope.firstname = snapshot.val().firstname;
                    $rootScope.userkey = snapshot.key();
                    $rootScope.person = snapshot.val().firstname + ' ' + snapshot.val().lastname;


                }, function (error) {
                    Utils.alertshow("Houston we have a problem!", error);
                    console.log('An error has occured getting user data: ', error);
                });

                $localStorage.myUser = myUser;
                console.log('LocalStorage myUser: ', $localStorage.myUser);
                Utils.hide();
                $timeout(function () {
                    $state.go('tab.dash');
                }, 500);

            }).catch(function (error) {
                console.log('Error: ', error);
                Utils.hide();
                Utils.alertshow("Houston we have a problem!", error);
            });
        }

    } //end controller

})();
