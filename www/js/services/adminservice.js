//adminservice.js

(function () {

    angular
        .module('clinpharm')
        .factory('Admin', Admin);

    function Admin(Auth, $location) {

        var exports = {
            logoutUser: logoutUser
        };

        return exports;

        /////////////////////////////////////

        function logoutUser() {
            console.log('Logging out from Admin factory.');
            Auth.$unauth();
            Auth.status = "loggedOut";
            $location('/login');


        }
    }

})();
