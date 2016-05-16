(function() {

        angular
            .module('clinpharm')
            .factory('Utils', Utils);

        function Utils($ionicLoading, $ionicPopup) {

            var Utils = {
                show: show,
                hide: hide,
                alertshow: alertshow,
                errMessage: errMessage
            }

            return Utils;
            
            function show() {

                    $ionicLoading.show({
                        noBackdrop: true,
                        template: '<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner><br /><span>Loading</span>'
                    });
                };

                //FIX spinner
                //                {
                //                    $ionicLoading.show({
                //                        animation: 'fade-in',
                //                        showBackdrop: true,
                //                        maxWidth: 200,
                //                        showDelay: 300,
                //                        template: '<p>Loading...<ion-spinner icon="ripple class="spinner-positive"></ion-spinner></p>'
                //                    });
                //                },

                function hide () {
                    $ionicLoading.hide();
                };

                function alertshow (tit, msg) {
                    var alertPopup = $ionicPopup.alert({
                        title: tit,
                        template: msg
                    });
                    alertPopup.then(function(res) {
                        //console.log('Registrado correctamente.');
                    });
                };

                function errMessage (err) {

                    var msg = "Unknown Error...";

                    if (err && err.code) {
                        switch (err.code) {
                            case "EMAIL_TAKEN":
                                msg = "This Email has been already been registered.";
                                break;
                            case "INVALID_EMAIL":
                                msg = "Email address is not valid.";
                                break;
                            case "NETWORK_ERROR":
                                msg = "Network Error.";
                                break;
                            case "INVALID_PASSWORD":
                                msg = "Invalid Password.";
                                break;
                            case "INVALID_USER":
                                msg = "Invalid User.";
                                break;
                        }
                    }
                    Utils.alertshow("Error", msg);
                };
            }; // end factory

})(); 