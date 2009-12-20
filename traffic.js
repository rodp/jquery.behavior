/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: true, newcap: true, immed: true */
/*global $ */
"use strict";

// Trafic light behavior
function TrafficLight(element, config) {

        // This is always helpful if you want to use
        // the parent object from within its functions.
    var self = this,
        
        // The colors of the traffic light.
        colors = ["red", "yellow", "green"],
        
        // This will be the current color of the trafic light,
        // identified by an index.
        state,
        
        // JS interval for changing the lights.
        interval,
    
        // This function will change the light to
        // the one identified by the given index.
        color = function (i) {
            element
                .find(".color").removeClass("on")
                .filter("." + colors[i]).addClass("on");
            state = i;
        },
        
        // This function changes the light to whichever is next.
        next = function () {
            color(state + 1 < colors.length ? state + 1 : 0);
        };
    
	// make sure we have jQuery object
	element = $(element);
	
    // This property defines how fast the lights change.
    // It will be public (accessible from outside).
    this.speed = config.speed || 1000;
    
    // This is a public method that starts changing the lights.
    this.play = function () {
        interval = setInterval(next, self.speed);
    };
   
    // This is a public method that stops changing the lights.
    this.stop = function () {
        clearInterval(interval);
    };
    
    // These are some initial settings:
    
    // We add a new element that will represent
    // one light for each of the colors.
    $.each(colors, function () {
        element.append('<div class="color ' + this + '"></div>');
    });
    
    // We bind an onclick event to each light
    // that will turn it on.
    element.find('.color').click(function () {
        color(element.children().index(this));
    });
    
    // We set the initial state of the trafic light.
    color(config.state || 0);
    
}