/*global angular */

/**
 * Services that persist and retrieves users from backend API.
 */

angular.module( 'CheckinSystem' )
    .factory( 'checkinApi', function( $http ) {

        var signinUrl = 'http://mydomainname.net:8080/app_/signin?instruction=';

        var checkinApi = {
            getUsers: function() {
                return $http.get( signinUrl + 'getall' )
                    .then( function( response ) {
                        return response.data;
                    });
            },

            addStaff: function( person ) {
                return $http.post( signinUrl + 'create&type=staff&name=' + person.name + '&status=1' )
                    .then( function success( response ) {
                        return response.data;
                    });
            },

            updateStaff: function( person ) {
                return $http.put( signinUrl + 'update&id=' + person.id + '&type=staff&name=' + person.name + '&status=' + person.status )
                    .then( function success( response ) {
                        return response.data;
                    });
            },

            addVisitor: function( person ) {
                return $http.post( signinUrl + 'create&type=visitor&name=' + person.name + '&status=1' )
                    .then( function success( response ) {
                        return response.data;
                    });
            },

            updateVisitor: function( person ) {
                return $http.put( signinUrl + 'update&id=' + person.id + '&type=visitor&name=' + person.name + '&status=' + person.status )
                    .then( function success( response ) {
                        return response.data;
                    });
            },

            deleteUser: function( person ) {
                return $http.post( signinUrl + 'delete&id=' + person.id )
                   .then( function success( response ) {
                        return response.data;
                    });
            }
        };

        return checkinApi;

    });
