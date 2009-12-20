 /*
 * jquery.behavior JavaScript Library v0.1
 * http://rodpetrovic.com/jquery/behavior
 *
 * Copyright (c) 2009 Rodoljub Petrović
 * Licensed under the MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: 2009-12-13
 */
/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: true, newcap: true, immed: true */
/*global jQuery */
/*members apply, behavior, each, fn, get */
"use strict";
jQuery.fn.behavior = function (action, args) {
    var element = this,
        type    = typeof action;
    
    function attach(Name, config) {
        return element.each(function () {
            this.behavior = new Name(this, config);
        });
    }
    
    function get(index) {
        return element.get(index || 0).behavior;
    }
    
    function map(method, attributes) {
        return element.each(function () {
            var obj = this.behavior;
            if (method in obj) {
                if (typeof obj[method] === "function") {
                    obj[method].apply(obj, attributes);
                } else {
                    obj[method] = attributes;
                }
            }
        });
    }
    
    if (type === "function") {
        return attach(action, args || {});
    } else if (action === "string") {
        return map(action, args || []);
    } else if (action === "number") {
        return get(action);
    }
    return get();
};
