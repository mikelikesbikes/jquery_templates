(function($) {
  $.template = function(str, options){
    this.defaults = {
      "begin_sep" : "__",
      "end_sep": "__"
    };

    this.settings = $.extend({}, $.template.defaults, options);
    this.str = str; // modify to take jquery, string, function

    this.to_s = function(params) {
      regex = new RegExp(this.settings.begin_sep + "(.+?)" + this.settings.end_sep, "g");
      return this.str.replace(regex,
        function (m, key) {
          var value = params[key];
          return typeof value === 'string' || typeof value === 'number' ? value : "";
      });
    }
  }
})(jQuery);
