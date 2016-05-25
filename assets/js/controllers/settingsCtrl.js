/*global angular */

/**
 * Controller for changing the redirect time in settings.
 */

angular.module( 'CheckinSystem' )
    .controller( 'settingsCtrl', function SettingsCtrl( $scope, $window, $location ) {

        // Hide success message by default
        $scope.success = false;

        $scope.getTimeout = function() {
            if ( $window.sessionStorage.timeout != undefined ) {
                $scope.timeout = $window.sessionStorage.timeout / 1000;
            }
        };

        $scope.changeTimeout = function() {
            var time = $scope.timeout * 1000;
            $window.sessionStorage.timeout = time;
            $scope.success = true;
        };

        $scope.updateTimeout = function() {
            /** Check if timeout has been changed, if not provide a default value */
            if( $window.sessionStorage.timeout == undefined ) {
                $window.sessionStorage.timeout = 10000;
            }
        };

    });