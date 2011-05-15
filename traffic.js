/*global $ */
/*jslint white: true, onevar: true, browser: true, undef: true, nomen: false, regexp: true, plusplus: true, bitwise: true, newcap: true, maxerr: 50, indent: 4 */

// Trafic light behavior
function TrafficLight(element, config) {
    "use strict";
    
	// make sure we have jQuery object
	element = $(element);
	
    // This property defines how fast the lights change.
    this.speed = config.speed || 1000;
    
    // We add a new element that will represent
    // one light for each of the colors.
    $.each(["red", "yellow", "green"], function () {
        element.append($("<div/>").addClass(this));
    });
    
    this._lights = element.children()
        // We bind an onclick event to each light that will turn it on.
        .click($.proxy(function (e) {
            this.stop();
            this.color(this._lights.index(e.target));
            this.play();
        }, this));
    
    // We set the initial state of the trafic light.
    this.color(config.state || 0);
}

// This function will change the light to the one identified by the given index.
TrafficLight.prototype.color = function (i) {
    this._lights
        .removeClass("on")
        .eq(i).addClass("on");
    this._state = i;
};

// This function changes the light to whichever is next.
TrafficLight.prototype.next = function () {
    var next = this._state + 1;
    this.color(next < this._lights.length ? next : 0);
};

// This is a public method that starts changing the lights.
TrafficLight.prototype.play = function () {
    this._interval = setInterval($.proxy(this.next, this), this.speed);
};

// This is a public method that stops changing the lights.
TrafficLight.prototype.stop = function () {
    clearInterval(this._interval);
};
