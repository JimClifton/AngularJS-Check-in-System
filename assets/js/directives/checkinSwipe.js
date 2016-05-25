/*global angular */

/**
 * Directive which manages:
 * - Updating the status of the staff / visitor on the back end
 * - Update the visual of signed in / out on the front end
 * - Touch gestures for swiping in and out
 */

angular.module( 'CheckinSystem' )
    .directive( 'swipeInOut', function() {

        var isTouch = 'ontouchstart' in window;

        var touchDown = false;
        var startX;
        var startY;
        var distance;
        var distanceTrigger = 20;

        return {

            link: function( scope, elem, attrs ) {

                /** Angular .find() is limited to lookup by tag name only */
                var checkbox = elem.parent().find( 'input' );
                var statusBar = elem.find( 'div' );

                function updateTransition() {
                    statusBar.css( 'transition', '-webkit-transform .2s' );
                    setTimeout( function() {
                        statusBar.css( 'transition', '-webkit-transform 0s' );
                    }, 200);
                }

                function statusBarSignedIn() {
                    statusBar.css( '-webkit-transform', 'translateX( 0 )' );
                    elem.addClass( 'is-signed-in' ).removeClass( 'is-signed-out' );
                }

                function statusBarSignedOut() {
                    statusBar.css( '-webkit-transform', 'translateX( -101% )' );
                    elem.addClass( 'is-signed-out' ).removeClass( 'is-signed-in' );
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
                    elem.addClass( 'is-signed-in' );
                }

                if( navigator.onLine ) {
                    /** Only trigger touch events if checkbox is not disabled */
                    if( !checkbox[0].disabled ) {

                        if( isTouch ) {
                            elem.on( 'touchstart', function( e ) {
                                var touchDown = true;
                                startX = e.touches[0].pageX;
                                startY = e.touches[0].pageY;
                            });

                            /** Triggers event whilst finger is on the screen */
                            elem.on( 'touchmove', function( e ) {
                                var width = elem[0].clientWidth;
                                var distanceMoved = e.touches[0].pageX - startX;
                                var distanceY = e.touches[0].pageY - startY;
                                distance = distanceMoved / ( width / 100 );

                                /** If user scrolls up or down more than 50px either way, reset distance to 0 */
                                if( distanceY > 50 || distanceY < -50 ) {
                                    distance = 0;
                                }

                                /**
                                 * If person.status is 1, distance will always be negative( - ) number
                                 * If person.status is 0, distance will always be positions( + ) number
                                 */
                                if( scope.person.status == '1' ) {
                                    /**
                                     * If user is signed in and distance is greater than distanceTrigger:
                                     * - Update statusbar position to match distance var
                                     */
                                    if( distance > -distanceTrigger ) {
                                        statusBar.css( '-webkit-transform', 'translateX( ' + distance + '% )' );
                                        elem.addClass( 'is-signed-in' ).removeClass( 'is-signing-in-out' );
                                    } else {
                                        statusBar.css( '-webkit-transform', 'translateX( ' + distance + '% )' );
                                        elem.addClass( 'is-signing-in-out' ).removeClass( 'is-signed-out' );
                                    }

                                    /**
                                     * Stop user from being able to swipe signed in user statusbar the wrong way
                                     */
                                    if( distance > 0 ) {
                                        statusBar.css( '-webkit-transform', 'translateX( 0 )' );
                                    }
                                } else {
                                    /** Updates distance variable to negative number */
                                    var offsetDistance = distance - 100;

                                    if( distance > distanceTrigger ) {
                                        statusBar.css( '-webkit-transform', 'translateX( ' + offsetDistance + '% )' );
                                        elem.addClass( 'is-signed-in' ).removeClass( 'is-signing-in-out' );
                                    } else {
                                        statusBar.css( '-webkit-transform', 'translateX( ' + offsetDistance + '% )' );
                                        elem.addClass( 'is-signing-in-out' ).removeClass( 'is-signed-out' );
                                    }
                                }
                            });

                            /** Triggers event when finger comes off the screen */
                            elem.on( 'touchend', function( e ) {
                                touchDown = false;

                                if( scope.person.status == '1' ) {
                                    /** If user is signed in and distance is less than distance trigger */
                                    if( distance < -distanceTrigger ) {
                                        statusBarSignedOut();
                                        updateTransition();
                                        scope.person.status = 0;
                                        updateStaffVisitorStatus();
                                    } else {
                                        statusBarSignedIn();
                                        updateTransition();
                                    }
                                } else {
                                    /** If user is signed in and distance is greater than distance trigger */
                                    if( distance > distanceTrigger ) {
                                        statusBarSignedIn();
                                        updateTransition();
                                        scope.person.status = 1;
                                        updateStaffVisitorStatus();
                                    } else {
                                        statusBarSignedOut();
                                        updateTransition();
                                    }
                                }

                            });

                        } else {
                            elem.on( 'click', function() {
                                if( scope.person.status == '1' ) {
                                    statusBarSignedOut();
                                    updateTransition();
                                    scope.person.status = 0;
                                    updateStaffVisitorStatus();
                                } else {
                                    statusBarSignedIn();
                                    updateTransition();
                                    scope.person.status = 1;
                                    updateStaffVisitorStatus();
                                }
                            });
                        }

                    }
                }

            }
        };
    });