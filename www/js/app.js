(function () {
    'user strict';

    angular.module('clinpharm', [
    'ionic',
    'ngStorage',
    'ngCordova',
    'firebase',
    'ngMessages',
    'ionic-toast'
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

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider


        //opening page and login
            .state('login', {
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

        .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'views/chats/tab-chats.html',
                        controller: 'ChatsCtrl',
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
