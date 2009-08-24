(function($) {
  $.template = function(str, params) {
    var begin_sep = $.template.defaults.begin_sep
    var end_sep = $.template.defaults.end_sep
    regex = new RegExp(begin_sep + "(.+?)" + end_sep, "g");
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