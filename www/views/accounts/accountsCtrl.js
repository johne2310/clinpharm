(function () {

    angular
        .module('clinpharm')
        .controller('AccountCtrl', AccountCtrl);

    AccountCtrl.$inject = ['$scope', 'FURL'];

    function AccountCtrl($scope, FURL) {

        var vm = this;

        vm.wards = ['2ES', '3ES', '4ES', '5ES', '6ES'];

    }

})();
