(function () {

    angular
        .module('clinpharm')
        .controller('DashCtrl', DashCtrl);

    DashCtrl.$inject = ['$scope', '$rootScope', 'Auth', '$location', 'ActivityService', '$ionicModal', '$ionicListDelegate', 'ActivityList', 'ionicToast', '$ionicPopup', '$timeout', 'SiteList', 'SetSites'];

    function DashCtrl($scope, $rootScope, Auth, $location, ActivityService, $ionicModal, $ionicListDelegate, ActivityList, ionicToast, $ionicPopup, $timeout, SiteList, SetSites) {

        var vm = this;
        vm.activity = {};
        vm.logOut = logOut;
        vm.addActivityModal = addActivityModal;
        vm.editActivityModal = editActivityModal;
        vm.deleteActivity = deleteActivity;
        vm.hide = hide;
        vm.cancelActivity = cancelActivity;
        vm.saveActivity = saveActivity;
        vm.getCount = getCount;
        vm.updateCount = updateCount;
        vm.updateActivity = updateActivity;
        vm.showToast = showToast;
        vm.hideToast = hideToast;
        vm.expandText = expandText;
        vm.showNotes = showNotes;

        var update;
        var userkey = $rootScope.userkey;


        $scope.$on('$ionicView.enter', function () {
            $timeout(function () {
                getCount();
            }, 500);

        });

        //load list of activities for logged in user
        vm.activities = ActivityService.getUser(userkey);

        //makde ActivityList available to scope
        vm.activityList = ActivityList;

        //get list of sites for logged in user
        var siteRef = SetSites;
        siteRef.on('value', function (snapshot) {

            vm.siteList = snapshot.val();
            console.log('site list for model: ', vm.siteList);

        });


        ////////////////////////////
        //Initialize the modal view.
        ////////////////////////////
        $ionicModal.fromTemplateUrl('views/chats/activityModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        function addActivityModal() {
            vm.activity = {};
            vm.addDate = Date.today();
            vm.action = 'Add';
            vm.add = true;
            vm.isAdd = true;
            vm.activity = {
                name: 'Chart review'
            };
            $scope.modal.show();
        }

        function editActivityModal(activity) {
            vm.activity = angular.copy(activity);
            vm.addDate = Date.parse(vm.activity.date);
            //            $scope.activity.name = vm.activity.name;
            vm.action = 'Edit';
            vm.edit = true;
            vm.isAdd = false;
            $scope.modal.show();
        }

        function cancelActivity() {
            vm.add = false;
            vm.edit = false;
            $scope.modal.hide();
            vm.hide();
        }

        function hide() {
            $ionicListDelegate.closeOptionButtons();
        }
        ////////////////////////////
        //end modal view.
        ////////////////////////////


        ///////////////////////////
        //function to deauthorise firebase connection
        ///////////////////////////
        function logOut() {
            // set logged status to facilitate destruction of firebaseObject in loginCtrl
            Auth.status = "loggedOut";
            //call Auth factory logout method to de-authorise firebase connection
            Auth.$unauth();
            //set base path for logged out users
            $location.path("/login");
            console.log('Log out successful.');
        }

        /////////////////////////////
        //function delete current activity
        /////////////////////////////
        function deleteActivity(activity) {
            update = 'delete';
            vm.activities.$remove(activity);
            updateCount();
        }

        /////////////////////////////
        //function save current activity
        /////////////////////////////
        function saveActivity() {
            vm.activities.$add({
                name: vm.activity.name,
                pharmacist: $rootScope.person,
                pharmacistId: $rootScope.userkey,
                date: moment(vm.addDate).format("DD/MM/YYYY"),
                recorded: moment().format("DD/MM/YYYY"),
                time: moment().format('hh:mm a'),
                timestamp: new Date().getTime(),
                notes: vm.activity.notes,
                site: vm.activity.site
            });
            showToast();
            update = 'add';
            vm.add = false;
            updateCount(); //update activity counters
            $scope.modal.hide(); //hide modal
            vm.hide(); //ensure option buttons are closed
        }

        /////////////////////////////
        //function update current activity
        /////////////////////////////
        function updateActivity(id) {
            var getIndex = vm.activities.$indexFor(id); //get array index for edited activity
            console.log('Index: ', getIndex + ' Date: ', vm.addDate);

            vm.activities[getIndex].date = moment(vm.addDate).format("DD/MM/YYYY");
            vm.activities[getIndex].name = vm.activity.name;
            vm.activities[getIndex].updated = true; //add a flag to show record has been edited
            vm.activities[getIndex].updatedon = moment().format("DD/MM/YYYY hh:mm a");
            vm.activities[getIndex].notes = vm.activity.notes;
            vm.activities[getIndex].site = vm.activity.site;
            vm.activities.$save(vm.activities[getIndex]).then(function (ref) {
                if (ref.key() === vm.activities[getIndex].$id) {
                    showToast();
                } // true

            });
            getCount();
            vm.edit = false;
            $scope.modal.hide(); //hide modal
            vm.hide(); //ensure option buttons are closed
        }

        /////////////////////////////
        //function get count of activities
        /////////////////////////////
        function getCount() {

            var activityDate; //set variable for getting activity data
            var lastSunday; //set variable to capture last Sunday
            var diff; //set variable that will hold the date difference in days
            var today = moment().format('DD'); //set variable equal to today's date
            vm.weekCount = 0; //set counter for this week total
            vm.monthCount = 0; //set counter for this month total
            vm.totalActivity = vm.activities.length; //set total count of activities

            console.log('Total: ', vm.totalActivity);

            //loop through activity array and set week and month count
            for (var i = 0; i < vm.activities.length; i++) {

                activityDate = moment(vm.activities[i].date, 'DD/MM/YYYY'); //set activity date
                lastSunday = moment().weekday(-1); //get date for last Sunday
                //calculate the difference between Sunday and activity date then use to match records
                diff = activityDate.diff(lastSunday, 'days');
                if (diff >= 0 && diff < 8) {
                    vm.weekCount = vm.weekCount + 1;
                }
                if (diff < 0 && diff > -today) {
                    vm.monthCount = vm.monthCount + 1;
                }
            }
            vm.monthCount = vm.monthCount + vm.weekCount;
        }

        /////////////////////////////
        //function update count of activities
        /////////////////////////////
        function updateCount() {
            if (update == 'add') {
                vm.weekCount = vm.weekCount + 1;
                vm.monthCount = vm.monthCount + 1;
                vm.totalActivity = vm.totalActivity + 1;
            }
            if (update == 'delete') {
                vm.weekCount = vm.weekCount - 1;
                vm.monthCount = vm.monthCount - 1;
                vm.totalActivity = vm.totalActivity - 1;
            }
        }

        /////////////////////////////
        //functions to show/hide toast
        /////////////////////////////
        function showToast() {
            //            ionicToast.show(message, position, stick, time);
            ionicToast.show('Activity saved.', 'middle', false, 1000);
        }

        function hideToast() {
            ionicToast.hide();
        }

        //clean up modal
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });

        /////////////////////////////
        //function to make text area grow with content
        /////////////////////////////
        function expandText() {
            var element = document.getElementById("notesId");
            element.style.height = element.scrollHeight + "px";
        }

        $scope.contactMessage = {
            text: "text"
        };

        function showNotes(activity) {
            $scope.viewNotes = activity.notes;
            console.log('Notes: ', $scope.viewNotes);
            console.log('Activity for notes ', activity.notes);
            $ionicPopup.show({
                templateURL: 'showNotes.html',
                title: 'Activty Notes',
                scope: $scope,
                buttons: [
                    {
                        text: 'Ok'
                    }
                ]
            });
        }
    } //controller function

})();
