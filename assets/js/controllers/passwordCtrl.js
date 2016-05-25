/*global angular */

/**
 * Controller for changing password.
 */

angular.module( 'CheckinSystem' )
    .controller( 'passwordCtrl', function PasswordCtrl( $scope, $window, $http ) {

        var apiUrl = 'http://mydomainname.net:8080/app_/signin?instruction=';

        // Hide success/error message by default
        $scope.success = false;
        $scope.error = false;

        $scope.changePassword = function() {
            return $http.get( apiUrl + 'authenticate&password=' + $scope.currentPassword )
                .then( function( response ) {
                    if( response.data === '1' && $scope.newPassword === $scope.confirmPassword ) {
                        return $http.post( apiUrl + 'changepassword&password=' + $scope.newPassword )
                            .then( function( cb ) {
                                $scope.success = true;
                                $scope.error = false;
                                $scope.currentPassword = '';
                                $scope.newPassword = '';
                                $scope.confirmPassword = '';
                            });
                    } else {
                        $scope.success = false;
                        $scope.error = true;
                        $scope.currentPassword = '';
                        $scope.newPassword = '';
                        $scope.confirmPassword = '';
                    }
                });
        };

    });