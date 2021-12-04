/*
 * The folowing two functions are available for you to use.
 * 
 * offsetBubble(x, y, bubbleId)
 *     This function will position the bubble with ID 'bubbleId' at an
 *     offset of (x, y) pixels from its original position in centre of
 *     the track.
 *
 *     The coordinate system's origin (0, 0) is the original bubble position.
 *     x increases to the right and y increases to the top of the view.
 *     
 *     Parameters:
 *         x, y:     Numbers in pixels. 
 *                   Negative values offset bubble in opposite direction.
 *         bubbleId: ID of bubble to be moved.
 * 
 *
 * bubbleTrackLength()
 *     Returns the length of both bubble tracks in pixels.
 * 
 *     Return value:
 *         Returns an Number of pixels representing the length.
 * 
 * 
 * removeMarkerStyles()
 *     Removes all JavaScript-created style changes from all track markers.
 *
 *
 * deviceMotionNormalisedAccelerationIncludingGravity(event)
 *     Given a DeviceMotionEvent object, returns a normalised version
 *     of the accelerationIncludingGravity property object with values
 *     matching Android, since Safari on iOS reports negated values.
 *     This is only useful if you want to test/run your app on iOS.
 * 
 *     Parameters:
 *         event:    A devicemotion event object.
 *     Return value:
 *         Returns an object with same properties as the 
 *         event.accelerationIncludingGravity object.
 * 
 * 
 * IDs of HTML elements of interest
 * =========================================
 * 
 * message-area       ID of text area at the bottom of the view.
 * vertical-25        ID of upper marker in vertical track.
 * vertical-50        ID of centre marker in vertical track.
 * vertical-75        ID of lower marker in vertical track.
 * horizontal-25      ID of left marker in horizontal track.
 * horizontal-50      ID of centre marker in horizontal track.
 * horizontal-75      ID of right marker in horizontal track.
 * vertical-bubble    ID of the bubble in vertical track.
 * horizontal-bubble  ID of the bubble in horizontal track. 
*/

// YOUR CODE HERE

if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', deviceMotionNormalisedAccelerationIncludingGravity);
} else {
    document.getElementById('vertical-bubble').innerHTML = 'Not Supported.'
    document.getElementById('horizontal-bubble').innerHTML = 'Not Supported.'
}