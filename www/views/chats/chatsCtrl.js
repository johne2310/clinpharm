(function () {

    angular
        .module('clinpharm')
        .controller('ChatsCtrl', ChatsCtrl);

    ChatsCtrl.$inject = ['$scope', 'Chats'];

    function ChatsCtrl($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        $scope.$on('$ionicView.enter', function () {
            getChats();
        });

        var vm = this;

        vm.getChats = getChats;
        vm.remove = remove;

        function getChats() {
            vm.chats = Chats.all();
        }

        function remove(chat) {
            Chats.remove(chat);
        }
    }

})();
