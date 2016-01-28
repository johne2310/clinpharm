(function () {

    angular.module('clinpharm')
        .factory('Auth', function (FURL, $firebaseAuth, $firebaseArray, $firebaseObject, Utils) {

            var ref = new Firebase(FURL);
            var auth = $firebaseAuth(ref);

            var Auth = {
                user: {},

                createProfile: function (uid, user) {
                    var users = {
                        id: uid,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        site: user.site,
                        ward: user.ward,
                        //        gravatar: get_gravatar(user.email, 40),
                        registered_in: Date()
                    };

                    var usersRef = ref.child('users/' + uid);
                    return usersRef.set(users);
                    //                .success(function (ref) {
                    //                var id = ref.key();
                    //                    console.log("added record with id " + uid);
                    usersRef.$indexFor(uid); // returns location in the array
                    //            });
                },

                login: function (user) {
                    return auth.$authWithPassword({
                        email: user.email,
                        password: user.password
                    });
                },

                register: function (user) {
                    return auth.$createUser({
                            email: user.email,
                            password: user.password
                        })
                        .then(function () {
                            // authenticate so we have permission to write to Firebase
                            console.log('Logging in users...');
                            //                            return Auth.login(user);
                        })
                        .then(function (data) {
                            // store user data in Firebase after creating account
                            console.log("User data:" + JSON.stringify(data));
                            return Auth.createProfile(data.uid, user);
                        })
                        .catch(function (err) {
                            console.log('A registration error has occured: ', err);
                        });
                },

                logout: function () {
                    auth.$unauth();
                    console.log("Logout from Auth successful.");
                },


                //TODO implement logout from Auth
                //                function logOut() {
                //            // set logged status to facilitate destruction of firebaseObject in loginCtrl
                //            Auth.status = "loggedOut";
                //            //call Auth factory logout method to de-authorise firebase connection
                //
                //            //            $window.location.reload(); // CHANGE Remove
                //            $ionicHistory.clearCache().then(function () {
                //                // Do... Whatever it is you do (if needed)
                //                $location.path("/login");
                //            });
                //            console.log('Log out successful.');
                //        }




                resetpassword: function (user) {
                    return auth.$resetPassword({
                        email: user.email
                    }).then(function () {
                        Utils.alertshow("Password reset email sent successfully!");
                        //console.log("Password reset email sent successfully!");
                    }).catch(function (error) {
                        Utils.errMessage(error);
                        //console.error("Error: ", error.message);
                    });
                },

                changePassword: function (user) {
                    return auth.$changePassword({
                        email: user.email,
                        oldPassword: user.oldPass,
                        newPassword: user.newPass
                    });
                },

                signedIn: function () {
                    return !!Auth.user.provider; //using !! means (0, undefined, null, etc) = false | otherwise = true
                }
            };

            auth.$onAuth(function (authData) {
                if (authData) {
                    angular.copy(authData, Auth.user);
                    console.log('Auth user -onAuth: ', Auth.user);
                    Auth.user.users = $firebaseObject(ref.child('users').child(authData.uid));
                    console.log('Auth user.users -onAuth: ', Auth.user.users);

                } else {
                    if (Auth.user && Auth.user.users) {
                        Auth.user.users.$destroy();

                    }

                    angular.copy({}, Auth.user);
                }
            });

            return Auth;

        });

})();
