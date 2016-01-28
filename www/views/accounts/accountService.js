(function () {

    angular
        .module('clinpharm')
        .factory('SiteList', SiteList);

    SiteList.$inject = ['$rootScope'];

    function SiteList($rootScope) {


        var siteList = [
            {
                text: "Epworth Richmond",
                ref: "1",
                checked: false
                    },
            {
                text: "Epworth Eastern",
                ref: "2",
                checked: false
                    },
            {
                text: "Epworth Freemason - CS",
                ref: "3",
                checked: false
                    },
            {
                text: "Epworth Freemasons - VP",
                ref: "4",
                checked: false
                    }
                ];

        return siteList;
    }
})();

/////////////////////////////////////////////
//factory for setting site Firebase reference
/////////////////////////////////////////////

(function () {

    angular
        .module('clinpharm')
        .factory('SetSites', SetSites);

    SetSites.$inject = ['$rootScope'];

    function SetSites($rootScope) {

        return {
            setUserSites: setUserSites
        };

        function setUserSites() {

            console.log('Set Sites RS userkey:', $rootScope.userkey); //TODO clean up

            var siteRef = new Firebase('https://clinpharm.firebaseio.com/users/' + $rootScope.userkey + '/sites'); //CHANGE - can this be changed? If not consider bringing into controller
            return siteRef;
        }

    }
})();

/////////////////////////////////////////////
//factory for setting user profile Firebase reference
/////////////////////////////////////////////

(function () {

    angular
        .module('clinpharm')
        .factory('GetUserProfile', GetUserProfile);

    GetUserProfile.$inject = ['$firebaseObject'];

    function GetUserProfile($firebaseObject) {

        return {
            getUserProfile: getUserProfile
        };

        function getUserProfile(userkey) {
            var ref = new Firebase('https://clinpharm.firebaseio.com/users');
            var profileRef = ref.child(userkey);

            return $firebaseObject(profileRef);
        }

        return GetUserProfile;
    }
})();
