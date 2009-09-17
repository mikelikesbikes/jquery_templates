(function($) {
  $.Template = function(str, options){

    this.defaults = {
      "begin_sep" : "__",
      "end_sep": "__"
    };

    this.settings = $.extend({}, $.Template.defaults, options);
    this.str = str; // modify to take jquery, string, function

    this.toString = function(params) {
      regex = new RegExp(this.settings.begin_sep + "(.+?)" + this.settings.end_sep, "g");
      return this.str.replace(regex,
        function (m, key) {
          var value = params[key];
          return typeof value === 'string' || typeof value === 'number' ? value : "";
      });
    }
  }

  var domManip = $.fn.domManip;
  $.fn.domManip = function() {
    var args = arguments[0];
    if(args && args.length > 1 && args[0] instanceof $.Template) {
      arguments[0] = [ args[0].toString(args[1]) ];
    }

    // Call the original method
    return domManip.apply(this, arguments);
  }
})(jQuery);
