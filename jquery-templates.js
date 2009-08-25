(function($) {
  $.template = function(str, params, options) {
    var settings = $.extend({}, $.template.defaults, options);

    regex = new RegExp(settings.begin_sep + "(.+?)" + settings.end_sep, "g");
    return str.replace(regex,
      function (a, b) {
        var r = params[b];
        return typeof r === 'string' || typeof r === 'number' ? r : "";
      });
  };

  $.template.defaults = {
    "begin_sep" : "__",
    "end_sep": "__"
  };
})(jQuery);
