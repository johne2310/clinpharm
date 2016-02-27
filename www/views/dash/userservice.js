//userservice.js


(function () {
    'use strict';
    /*global angular */

    angular
        .module('clinpharm')
        .factory('UserService', UserService);

    UserService.$inject = ['$rootScope', '$localStorage', '$q', '$localForage'];

    function UserService($rootScope, $localStorage, $q, $localForage) {

        var myFirstname = $rootScope.firstname;

        var exports = {
            getFirstname: getFirstname,
            getFullname: getFullname,
            myFirstname: myFirstname
        };

        return exports;

        /////////////////////////////////

        //start functions
        function getFirstname() {
            //            var myFirstname = $rootScope.firstname;
            var myFirstname;
            if ($localStorage.myUser !== undefined) {
                myFirstname = $localStorage.myUser.firstname;
            } else {
                myFirstname = $rootScope.firstname;
            }

            //            console.log('Userservice: getFirstname (localstorage): ', $localStorage.myUser.firstname);
            return $q.when(myFirstname);
        }

        function getFullname() {
            var myFullname;
            if ($localStorage.myUser !== undefined) {
                myFullname = $localStorage.myUser.person;
            } else {
                myFullname = $rootScope.person;
            }
            return $q.when(myFullname);
        }


        //        function getUserKey() {
        //            var userkey;
        //            return $q(function (resolve, reject) {
        //                if ($localStorage.myUser.userkey === undefined) {
        //                    userkey = $rootScope.userkey;
        //                    console.log('localstorage does not exist');
        //                } else {
        //                    console.log('localstorage exists');
        //                    userkey = $localStorage.myUser.userkey;
        //                    console.log('Userservice: getUserKey (localstorage - factory): ', $localStorage.myUser.userkey);
        //                    resolve(userkey);
        //                    //                    return userkey;
        //                }
        //
        //            });
        //        }


    }

})();
