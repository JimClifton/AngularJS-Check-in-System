/*global angular */

/**
 * Controller for logging in and out of the admin area.
 */

angular.module( 'CheckinSystem' )
    .controller( 'loginCtrl', function LoginCtrl( $scope, $window, $location, $http ) {

        var apiUrl = 'http://mydomainname.net:8080/app_/signin?instruction=';

        // Hide error message by default
        $scope.error = false;

        $scope.adminLogin = function( password ) {
            return $http.get( apiUrl + 'authenticate&password=' + $scope.password )
                .then( function( response ) {
                    if( response.data === '1' ) {
                        $window.sessionStorage.authenticated = true;
                        $location.path( '/admin' );
                    } else {
                        $scope.password = '';
                        $scope.error = true;
                    }
                });
        };

        $scope.adminLogout = function() {
            $window.sessionStorage.clear();
            $location.path( '/' );
        };

    });