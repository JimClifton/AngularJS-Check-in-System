/*global angular */

/**
 * Directive which manages:
 * - Updating the status of the staff / visitor on the back end
 * - Update the visual of signed in / out on the front end
 */

angular.module( 'CheckinSystem' )
    .directive( 'toggleInOut', function() {

        return {

            link: function( scope, elem, attrs ) {

                /** Angular .find() is limited to lookup by tag name only */
                var checkbox = elem.parent().parent().find( 'input' );
                var statusBar = elem.parent().find( 'div' );

                function statusBarSignedIn() {
                    elem.parent().addClass( 'is-signed-in' ).removeClass( 'is-signed-out' );
                }

                function statusBarSignedOut() {
                    elem.parent().addClass( 'is-signed-out' ).removeClass( 'is-signed-in' );
                }

                function updateStaffVisitorStatus() {
                    /** Check if the view is staff or visitor then updates BE accordingly */
                    if( document.getElementById( 'staff' ) ) {
                        scope.updateStaff( scope.person );
                    } else if( document.getElementById( 'visitor' ) ) {
                        scope.updateVisitor( scope.person );
                    }
                }

                /** Update UI to show the user as signed in on Load */
                if( scope.person.status == '1' ) {
                    elem.parent().addClass( 'is-signed-in' );
                } else {
                    elem.parent().addClass( 'is-signed-out' );
                }

                if( navigator.onLine ) {
                    /** Only trigger touch events if checkbox is not disabled */
                    if( !checkbox[0].disabled ) {
                        elem.on( 'click', function() {
                            if( scope.person.status == '1' ) {
                                statusBarSignedOut();
                                scope.person.status = 0;
                                updateStaffVisitorStatus();
                            } else {
                                statusBarSignedIn();
                                scope.person.status = 1;
                                updateStaffVisitorStatus();
                            }
                        });
                    }
                }

            }
        };
    });