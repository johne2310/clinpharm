//login.js
/*global angular */
/*global Firebase */

/////////////////////////
// Auth factory:
/////////////////////////

(function () {

    angular
        .module('clinpharm')
        .factory('Auth', Auth);

    function Auth($firebaseAuth) {

        console.log('Starting Auth factory...');
        var userRef = new Firebase('https://clinpharm.firebaseio.com');
        return $firebaseAuth(userRef);
    }

})();


/////////////////////////
// Messages factory
/////////////////////////
(function () {

    angular
        .module('clinpharm')
        .factory('Messages', Messages);

    function Messages($firebaseArray) {

        console.log('Starting Messages factory...');
        var ref = new Firebase('https://clinpharm.firebaseio.com/messages');
        return $firebaseArray(ref);
    }

})();
