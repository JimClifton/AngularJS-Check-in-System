/*global angular */
/*global moment */

/**
 * The main controller for the app:
 * - Loads staff and visitor data from the backend
 * - Updates staff and visitor data stored in the backend
 * - Deletes staff and visitor data stored in the backend
 * - Deletes vistor data added 30 days ago
 * - Automaticaly redirects the user to the homepage after x seconds
 */

angular.module( 'CheckinSystem' )
    .controller( 'checkinCtrl', function CheckinCtrl( $scope, checkinApi, $window, $location, $localStorage ) {

        $scope.$storage = $localStorage.$default( {
            staff: [],
            visitor: []
        });

        $scope.offline = false;

        if( !navigator.onLine ) {
            $scope.offline = true;
        }

        function loadUsers() {
            checkinApi.getUsers()
                .then( function( data ) {
                    $scope.staff = data.staff;
                    $scope.visitor = data.visitor;

                    $scope.$storage.staff = data.staff;
                    $scope.$storage.visitor = data.visitor;
                });
        }

        $scope.getUsers = loadUsers();

        $scope.deleteUser = function( person ) {
            checkinApi.deleteUser( person )
                .then(function( cb ) {
                    loadUsers();
                });
        };


        /**
         * Staff
         */

        $scope.addStaff = function( person ) {
            checkinApi.addStaff( person )
                .then(function( cb ) {
                    $scope.person.name = '';
                    loadUsers();
                });
        };

        $scope.updateStaff = function( person ) {
            switch(person.status) {
                case true:
                    person.status = "1";
                break;
                case false:
                    person.status = "0";
                    break;
            }
            checkinApi.updateStaff( person );
        };


        /**
         * Visitor
         */

        $scope.addVisitor = function( person ) {
            checkinApi.addVisitor( person )
                .then(function( cb ) {
                    $scope.person.name = '';
                    loadUsers();
                });
        };

        $scope.updateVisitor = function( person ) {
            switch(person.status) {
                case true:
                    person.status = "1";
                break;
                case false:
                    person.status = "0";
                    break;
            }
            checkinApi.updateVisitor( person );
        };

        /** Delete visitor after 30 days */
        $scope.autoDeleteVisitor = function() {
            checkinApi.getUsers()
                .then( function( data ) {
                    angular.forEach( $scope.visitor, function( value ) {
                        var dateAdded = value.dateAdded;
                        var sinceAdded = moment().diff( dateAdded, 'days' );

                        if( sinceAdded > 30 ) {
                            checkinApi.deleteUser( value );
                        }
                    });
                });
        };


        /**
         * Redirect Home
         */

        var timer;
        var location = $location.path();

        function redirect() {
            if( location === '/staff' || location === '/visitor' ) {
                setTimer();
                var redirectEvents = document.getElementById( 'redirectEvents' );
                redirectEvents.addEventListener( 'mousemove', setTimer );
                redirectEvents.addEventListener( 'mousedown', setTimer );
                redirectEvents.addEventListener( 'touchstart', setTimer );
                redirectEvents.addEventListener( 'touchmove', setTimer );
                redirectEvents.addEventListener( 'touchend', setTimer );
            } else {
                clearTimer();
            }
        }

        function setTimer() {
            clearInterval( timer );
            clearInterval( $window.sessionStorage.timer );

            timer = setTimeout( function() {
                window.location.href = 'index.html';
            }, $window.sessionStorage.timeout );

            $window.sessionStorage.timer = timer;

            /** Check if timeout has been set, if not provide a default value */
            if( $window.sessionStorage.timeout == undefined ) {
                $window.sessionStorage.timeout = 10000;
            }
        }

        function clearTimer() {
            clearTimeout( timer );
            clearTimeout( $window.sessionStorage.timer );
        }

        redirect();

    });
