/*
 * jquery.behavior JavaScript Library v2.0
 * http://rodpetrovic.com/jquery/behavior
 *
 * Copyright 2010, Rodoljub Petrović
 * Licensed under the MIT
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Contributors:
 *  - Matjaž Lipuš
 *
 * Date: 2011-05-15
 */
/*jslint white: true, onevar: true, undef: true, nomen: true, regexp: true, plusplus: true, bitwise: true, newcap: true, strict: true, maxerr: 50, indent: 4 */
/*global jQuery */
(function ($, undef) {
    "use strict";
    
    function attach($jq, Behavior, config) {
        $jq.each(function () {
            if (!this.behavior) {
                this.behavior = {};
            }
            $.extend(this.behavior, new Behavior(this, config));
        });
    }
    
    function each($jq, property, attributes) {
        $jq.each(function () {
            var behavior = this.behavior;
            if (behavior && behavior[property] !== undef) {
                if (typeof behavior[property] === "function") {
                    behavior[property].apply(behavior, attributes || []);
                } else {
                    behavior[property] = attributes;
                }
            }
        });
    }
    
    function get($jq, index) {
        return $jq.get(index || 0).behavior;
    }
    
    $.fn.behavior = function (a, b) {
        var type = typeof a;

        if (type === "function") {
            attach(this, a, b || {});
            return this;
        } else if (type === "string") {
            each(this, a, b);
            return this;
        }
        return get(this, a);
    };
}(jQuery));