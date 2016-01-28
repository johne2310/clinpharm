(function () {

    angular
        .module('clinpharm')
        .controller('SummaryCtrl', SummaryCtrl);

    SummaryCtrl.$inject = ['$scope'];

    function SummaryCtrl($scope) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        $scope.$on('$ionicView.enter', function () {

        });

        var vm = this;

var ref = new Firebase('https://clinpharm.firebaseio.com/activity');

        ref.orderByChild


    } // end controller

})();
