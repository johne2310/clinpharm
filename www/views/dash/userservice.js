(function () {

    angular
        .module('clinpharm')
        .factory('UserService', UserService);

    function UserService($rootScope) {

        console.log('userservice factory rootscope: ', $rootScope.firstname);

        return {
            getFirstname: getFirstname,
            getFullname: getFullname,
            getUserKey: getUserKey
        };


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
            console.log('Userservice: getUserKey: ', $rootScope.userkey)
            var userkey = $rootScope.userkey;
            return userkey;
        }
    }

})();

//
//
//(function () {
//
//    angular
//        .module('clinpharm')
//        .factory('UserService', UserService);
//
//    //    UserService.$inject = ['$rootScope', '$localStorage', 'ActivityService'];
//
//    function UserService($rootScope) {
//
//        //        console.log('Factory startup clinPharmUser object:', $localstorage.clinPharmUser);
//        //            console.log('Factory rootscope userkey:', $rootScope.userkey);
//        console.log('Factory rootscope firstname:', $rootScope.firstname);
//
//        return {
//            //            getUserDetails: getUserDetails,
//            //            getUserKey: getUserKey,
//            getUserFirstname: getUserFirstname
//                //            getActivityList: getActivityList
//        };
//
//        //        function getUserDetails() {
//
//        //            var clinPharmUser = $localstorage.clinPharmUser;
//        //            console.log('Factory clinPharmUser object:', clinPharmUser);
//        //
//        //            return clinPharmUser;
//        //        }
//
//        //        function getUserKey() {
//        //            var userkey = $rootScope.userkey;
//        //            return userkey;
//        //        }
//
//        function getUserFirstname() {
//            var firstname = $rootScope.firstname;
//            return firstname;
//        }
//        //
//        //        function getActivityList() {
//        //            var activityList = ActivityService;
//        //            return activityList;
//        //        }
//
//
//
//    }
//
//})();

// console.log('Factory startup clinPharmUser object:', $sessionStorage.clinPharmUser);
//
//        return {
//            getUserDetails: getUserDetails
//        };
//
//        function getUserDetails() {
//
//            var clinPharmUser = $sessionStorage.clinPharmUser;
//            console.log('Factory clinPharmUser object:', clinPharmUser);
//
//            return clinPharmUser;
//        }


// console.log('Factory startup clinPharmUser object:', $localstorage.clinPharmUser);
//
//        return {
//            getUserDetails: getUserDetails
//        };
//
//        function getUserDetails() {
//
//            var clinPharmUser = $localstorage.clinPharmUser;
//            console.log('Factory clinPharmUser object:', clinPharmUser);
//
//            return clinPharmUser;
//        }
