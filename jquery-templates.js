(function($) {
  $.template = function(str, params) {
    return str.replace(/{([^{}]*)}/g,
            function (a, b) {
                var r = params[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
  };
})(jQuery);