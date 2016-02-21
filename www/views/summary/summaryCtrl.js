//summaryCtrl.js

/*jslint white:true */
/*global angular */


(function () {
    'user strict';

    angular
        .module('clinpharm')
        .controller('SummaryCtrl', SummaryCtrl);

    SummaryCtrl.$inject = ['$scope', 'Summary', '$timeout'];

    function SummaryCtrl($scope, Summary, $timeout) {

        var vm = this;

        vm.siteArray = [];
        vm.newCount = [];
        vm.siteCount = {};

        $scope.$on('$ionicView.enter', function () {
            // include actions here required each time view is entered

        });

        //        vm.mySiteCount = Summary.getSiteActivityCount();

        Summary.getSiteActivityCount()
            .then(function (data) {
                vm.siteCount = data;
                console.log('siteCount from then:', vm.siteCount);
            }).catch(function (error) {

                console.log('Error:', error);
            });


        console.log('today:', Summary.today);
        // TODO: implemenet count for each site (this week, this month, last month)

        /*
        1. Retrieve  activity data using startat call
        2. Iterate values to get count of each site

        */


        //
        //        function getSiteActivityCount() {
        //
        //            var ref = new Firebase('https://clinpharm.firebaseio.com/activity');
        //            vm.siteArray = $firebaseArray(ref);
        //
        //            vm.siteArray.$loaded().then(function () {
        //
        //                console.log('SiteArray 2', vm.siteArray);
        //
        //                angular.forEach(vm.siteArray, function (value, key) {
        //                    //                                        console.log('Getting for each');
        //                    if (value.site === undefined) {
        //                        value.site = 'Not recorded';
        //                    }
        //
        //                    vm.newCount.push(
        //                        //                        'key': key,
        //                        value.site
        //                        //                        'name': value.name
        //                    );
        //
        //                    console.log('key: ', key + ': Value: ', value.site);
        //
        //                });
        //                console.log('vm.count: ', vm.newCount);
        //                vm.siteCount = _.countBy(vm.newCount, _.identity);
        //                console.log('Site count: ', vm.siteCount);
        //
        //            });

        //        }


    } // end controller

})();
