//userservice.js


(function () {
    'use strict';
    /*global angular */

    angular
        .module('clinpharm')
        .factory('UserService', UserService);

    UserService.$inject = ['$rootScope', '$localStorage'];

    function UserService($rootScope, $localStorage) {

        var myFirstname = $rootScope.firstname;

        var exports = {
            getFirstname: getFirstname,
            getFullname: getFullname,
            getUserKey: getUserKey,
            myFirstname: myFirstname
        };

        return exports;

        /////////////////////////////////

        //start functions
        function getFirstname() {
            //            var myFirstname = $rootScope.firstname;
            var myFirstname = $localStorage.myUser.firstname;
            console.log('Userservice: getFirstname (localstorage): ', $localStorage.myUser.firstname);
            return myFirstname;
        }

        function getFullname() {
            //            var myFullname = $rootScope.person;
            var myFullname = $localStorage.myUser.person;
            console.log('Userservice: getFullname (localstorage): ', $localStorage.myUser.person);
            return myFullname;
        }

        function getUserKey() {
            console.log('Userservice: getUserKey: ', $rootScope.userkey);
            console.log('Userservice: getUserKey (localstorage): ', $localStorage.myUser.userkey);
            //            var userkey = $rootScope.userkey;
            var userkey = $localStorage.myUser.userkey;
            return userkey;
        }
    }

})();
