//activity.service.js
/*global angular */
/*global Firebase */

(function () {

    angular
        .module('clinpharm')
        .factory('ActivityService', ActivityService);

    ActivityService.$inject = ['$firebaseArray'];

    function ActivityService($firebaseArray) {

        var ref = new Firebase('https://clinpharm.firebaseio.com' + '/activity');

        var exports = {
            setArray: setArray,
            getUser: getUser,
            getQuery: getQuery
        };

        return exports;

        /////////////////////////////////////////

        function setArray() {
            //            return $q.when($firebaseArray(ref));
            return $firebaseArray(ref);
        }

        function getUser(userkey) {

            var userQuery = ref
                .orderByChild('pharmacistId')
                .equalTo(userkey);
            //                .limitToLast(3);

            return $firebaseArray(userQuery);
        }

        function getQuery() {
            var query = ref
                .orderByChild('pharmacistId')
                .limitToLast(5);

            return $firebaseArray(query);
        }
        //        return ActivityService;
    }

})();


//        instantiate new firebase + firebaseArray
//        var dataRef = new Firebase('https://clinpharm.firebaseio.com/activity');
//
//        return $firebaseArray(dataRef);





//        var userkey;

//        var ref = new Firebase('https://clinpharm.firebaseio.com' + '/activity');
//
//        return {
//            setArray: setArray,
//            getUser: getUser
//        };
//
//
//        function setArray() {
//            //            return $q.when($firebaseArray(ref));
//            return $firebaseArray(ref);
//        }
//
//        function getUser(userkey) {
//            ref
//                .orderByChild('pharmacistId')
//                .equalTo(userkey);
//        }