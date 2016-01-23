(function () {

    angular
        .module('clinpharm')
        .controller('ChatDetailCtrl', ChatsDetailCtrl);

    ChatsDetailCtrl.$inject = ['$scope', '$stateParams', 'Chats'];

    function ChatsDetailCtrl($scope, $stateParams, Chats) {

        var vm = this;
        //        vm.getDetails = getDetails;

        vm.chat = Chats.get($stateParams.chatId);
        console.log(vm.chat);

    }

})();
