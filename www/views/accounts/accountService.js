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

//        var siteRef = new Firebase('https://clinpharm.firebaseio.com/users/' + $rootScope.userkey + '/sites');
 //
 //        siteRef.on('value', function (snapshot) {
 //            //iterate siteList and Firebase sites node and mark matches as checked = true
 //            for (var s = 0; s < siteList.length; s++) {
 //                for (var f = 0; f < snapshot.val().length; f++) {
 //                    if (siteList[s].text === snapshot.val()[f]) {
 //                        siteList[s].checked = true; //set sites to be marked as checked in siteList
 //                    }
 //                }
 //            }
 //        });

        //TODO update checked status before return call
        return siteList;
    }
})();

/////////////////////
//factory for setting site Firebase reference

(function () {

    angular
        .module('clinpharm')
        .factory('SetSites', SetSites);

    SetSites.$inject = ['$rootScope'];

    function SetSites($rootScope) {
        var siteRef = new Firebase('https://clinpharm.firebaseio.com/users/' + $rootScope.userkey + '/sites');
        return siteRef;
    }
})();
