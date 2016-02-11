(function () {
    
/*jslint white:true */
/*global angular */

    angular 
        .module('clinpharm')
        .controller('AccountCtrl', AccountCtrl);

    AccountCtrl.$inject = ['$scope', '$rootScope', '$state', 'SiteList', 'Utils', 'SetSites', '$timeout'];

    function AccountCtrl($scope, $rootScope, $state, SiteList, Utils, SetSites, $timeout) {

        var vm = this;
        vm.setSites = setSites;
        vm.getSites = getSites;
        vm.cancelSetting = cancelSetting;

        function getSites() {

            //set variable from factory Firebase ref
            var siteRef = new Firebase('https://clinpharm.firebaseio.com/users/' + $rootScope.userkey + '/sites'); //SetSites;

            //make list of sites available to scope (from factory)
            vm.siteList = SiteList;

            //set all checked to false
            for (var c = 0; c < vm.siteList.length; c++) {
                console.log('Setting checked to false');
                vm.siteList[c].checked = false;
            }

            siteRef.on('value', function (snapshot) {

                //iterate siteList and Firebase sites node and mark matches as checked = true
                //first time Freibase sites will be empty (zero length)

                if (snapshot.exists()) {

                    for (var s = 0; s < vm.siteList.length; s++) {
                        for (var f = 0; f < snapshot.val().length; f++) {
                            if (vm.siteList[s].text === snapshot.val()[f].name) {
                                vm.siteList[s].checked = true; //set sites to be marked as checked in siteList
                            }
                        }
                    }
                } else {
                    Utils.alertshow('Please select your site/s');
                }
            });
        }

        $scope.$on('$ionicView.enter', function () {

            getSites();

        }); //end Enter View


        ///////////////////////////////////////////////////////////////
        //function to read site selection and push to array for storage
        ///////////////////////////////////////////////////////////////
        function setSites() {
            var p = [];
            for (var i = 0; i < vm.siteList.length; i++) {
                var item = vm.siteList[i];
                if (item.checked) {
                    p.push({
                        name: item.text,
                        ref: Math.floor(Math.random() * 10001)
                    });
                }
            }

            //set Firebase reference
            vm.userRef = new Firebase('https://clinpharm.firebaseio.com/users/' + $scope.userkey + '/sites'); //CHANGE get userkey from factory
            //set Firebase callback for site sync
            var onComplete = function (error) {
                if (error) {
                    console.log('Synchronization failed');
                    Utils.alertshow("Houston we have a problem!", error);
                } else {
                    console.log('Synchronization succeeded');
                    $state.go('tab.dash');
                }
            };
            //save result to Fireabase
            vm.userRef.set(p, onComplete);
        }
        //end setSites

        ///////////////////////////////////////////////////////////////
        //function to cancel edit to settingse
        ///////////////////////////////////////////////////////////////
        function cancelSetting() {

            $state.go('tab.dash');
        }



    } //end controller

})();