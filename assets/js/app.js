/*global angular */

/**
 * The main Checkin app module
 *
 * @type {angular.Module}
 */

angular.module( 'CheckinSystem', [ 'ngRoute', 'ngStorage' ] )
    .config( ['$routeProvider', function( $routeProvider ) {

        $routeProvider
            .when( '/', {
                controller: 'checkinCtrl',
                templateUrl: 'templates/index.html'
            } )
            .when( '/staff', {
                controller: 'checkinCtrl',
                templateUrl: 'templates/staff.html'
            } )
            .when( '/visitor', {
                controller: 'checkinCtrl',
                templateUrl: 'templates/visitor.html'
            } )
            .when( '/list', {
                controller: 'checkinCtrl',
                templateUrl: 'templates/list.html'
            } )
            .when( '/login', {
                controller: 'loginCtrl',
                templateUrl: 'templates/login.html',
                resolve: {
                    checkAuth: checkAuth
                }
            } )
            .when( '/admin', {
                controller: 'loginCtrl',
                templateUrl: 'templates/admin.html',
                resolve: {
                    checkAuth: checkAuth
                }
            } )
            .when( '/editusers', {
                controller: 'checkinCtrl',
                templateUrl: 'templates/edit-user.html',
                resolve: {
                    checkAuth: checkAuth
                }
            } )
            .when( '/changepassword', {
                controller: 'passwordCtrl',
                templateUrl: 'templates/change-password.html',
                resolve: {
                    checkAuth: checkAuth
                }
            } )
            .when( '/settings', {
                controller: 'settingsCtrl',
                templateUrl: 'templates/settings.html',
                resolve: {
                    checkAuth: checkAuth
                }
            } )
            .otherwise({
                redirectTo: '/'
            });

    }]);


var checkAuth = function( $q, $rootScope, $location, $window ) {
    var defer = $q.defer();

    if( $window.sessionStorage.authenticated === undefined ) {
        $location.path( '/login' );
    } else {
        if( $location.path() == '/login' ) {
            $location.path( '/admin' );
        } else {
            defer.resolve();
            return defer.promise;
        }
    }
};

