//activity.service.js
/*global angular */
/*global Firebase */

(function () {

    angular
        .module('clinpharm')
        .factory('ActivityService', ActivityService);

    ActivityService.$inject = ['$firebaseArray', '$ionicScrollDelegate'];

    function ActivityService($firebaseArray, $ionicScrollDelegate) {

        var ref = new Firebase('https://clinpharm.firebaseio.com' + '/activity');

        var exports = {
            setArray: setArray,
            getUserActivities: getUserActivities,
            getQuery: getQuery,
            scrollTop: scrollTop,
            scrollTopList: scrollTopList
        };

        return exports;

        /////////////////////////////////////////

        function setArray() {
            //            return $q.when($firebaseArray(ref));
            return $firebaseArray(ref);
        }

        function getUserActivities(userkey) {

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

        function scrollTop() {
            $ionicScrollDelegate.$getByHandle('modalContent').scrollTop(true);
        }

        function scrollTopList() {
            $ionicScrollDelegate.$getByHandle('listContent').scrollTop(true);
        }

        //        return ActivityService;
    }

})();
