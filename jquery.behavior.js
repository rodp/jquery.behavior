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
(function ($) {
    $.fn.behavior = function () {
      var element = this;
      
      var attach = function (cls, config) {
        $(element).each(function () {
          this.behavior = new cls(this, config);
        });
        
        return $(element);
      }
      
      var get = function (index) {
        return $(element).get(index || 0).behavior;
      }
      
      var map = function (method, attributes) {
        $(element).each(function () {
          var obj = this.behavior;
          if (method in obj) {
            if (typeof obj[method] == 'function') {
              obj[method].apply(obj, attributes);
            } else {
              obj[method] = attributes;
            }
          }
        });
        
        return $(element);
      }
   
      if (arguments.length > 0 && typeof arguments[0] == 'function') {
        return attach(arguments[0], arguments.length > 1 ? arguments[1] : {});
      } else if (arguments.length > 0 && typeof arguments[0] == 'string') {
        return map(arguments[0], arguments.length > 1 ? arguments[1] : []);
      } else if (arguments.length > 0 && typeof arguments[0] == 'number') {
        return get(arguments[0]);
      } else {
        return get();
      }
    }
})(jQuery);
