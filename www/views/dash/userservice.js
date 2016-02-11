//userservice.js
/*global angular */

(function () {

    angular
        .module('clinpharm')
        .factory('UserService', UserService);

    function UserService($rootScope) {

        console.log('userservice factory rootscope: ', $rootScope.firstname);

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
            var myFirstname = $rootScope.firstname;
            return myFirstname;
        }

        function getFullname() {
            var myFullname = $rootScope.person;
            return myFullname;
        }

        function getUserKey() {
            console.log('Userservice: getUserKey: ', $rootScope.userkey);
            var userkey = $rootScope.userkey;
            return userkey;
        }
    }

})();
