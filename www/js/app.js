// app.js

(function () {
    'user strict';
    /*global angular */

    angular.module('clinpharm', [
    'ionic',
    'ngStorage',
    'ngCordova',
    'firebase',
    'ngMessages',
    'ionic-toast',
    'LocalForageModule'
])

    // Changue this for your Firebase App URL.
    .constant('FURL', 'https://clinpharm.firebaseio.com/')

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $localForageProvider) {

        $localForageProvider.config({
            name: 'clinPharm', // name of the database and prefix for your data, it is "lf" by default
            version: 1.0, // version of the database, you shouldn't have to use this
            storeName: 'startup', // name of the table
            description: 'ClinPharm App'
        });

        $stateProvider
            .state('login', { //opening page and login
                cache: false,
                url: '/login',
                templateUrl: 'views/login/login.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })

        //register page
        .state('register', {
            cache: false,
            url: '/register',
            templateUrl: 'views/register/register.html',
            controller: 'registerCtrl',
            controllerAs: 'vm'
        })

        //Forgot password page
        .state('forgot', {
            url: '/forgot',
            templateUrl: 'views/forgot/forgot.html',
            controller: 'forgotCtrl',
            controllerAs: 'vm'
        })

        // setup an abstract state for the tabs directive
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'views/tabs.html'
        })

        // Each tab has its own nav history stack:

        .state('tab.home', {
            cache: false,
            url: '/home',
            views: {
                'tab-home': {
                    templateUrl: 'views/home/tab-home.html',
                    controller: 'HomeCtrl',
                    controllerAs: 'vm'
                }
            }
        })

        .state('tab.dash', {
            cache: false,
            url: '/dash',
            views: {
                'tab-dash': {
                    templateUrl: 'views/dash/tab-dash.html',
                    controller: 'DashCtrl',
                    controllerAs: 'vm'
                }
            }
        })

        .state('tab.summary', {
                url: '/summary',
                views: {
                    'tab-summary': {
                        templateUrl: 'views/summary/tab-summary.html',
                        controller: 'SummaryCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chat/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'views/chatDetail/chat-detail.html',
                        controller: 'ChatDetailCtrl',
                        controllerAs: 'vm'
                    }
                }
            })

        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: 'views/accounts/tab-account.html',
                    controller: 'AccountCtrl',
                    controllerAs: 'vm'
                }
            }
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });
})();
