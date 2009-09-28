(function($) {
  $.Template = function(str, options){

    this.settings = $.extend({}, $.Template.defaults, options);
    this.str = $.trim($('<div>').append($(str).clone()).remove().html()); // modify to take function

    this.fill = function(params) {
      if (this.settings.beforeFill.apply(this) === false) {
        return '';
      }
      regex = new RegExp(this.settings.begin_sep + "(.+?)" + this.settings.end_sep, "g");
      var filled = this.str.replace(regex,
        function (m, key) {
          var value = params[key];
          return typeof value === 'string' || typeof value === 'number' ? value : "";
      });
      this.settings.afterFill.apply(this);
      return filled;
    };
  };
  $.Template.defaults = {
    "begin_sep" : "__",
    "end_sep": "__",
    "beforeFill": function(){},
    "afterFill": function(){}
  };

  (function(oldDomManip){
    $.fn.domManip = function() {
      var args = arguments[0];
      if(args && args.length > 1 && args[0] instanceof $.Template) {
        arguments[0] = [ args[0].fill(args[1]) ];
      }

      // Call the original method
      return oldDomManip.apply(this, arguments);
    };
  })($.fn.domManip);
  
  $.fn.templatize = function(params, options){
    var $templates = $([]);
    this.each(function(index, element){
      var template = new $.Template($(element), options);
      var p = $.isArray(params)? params[index]||{} : params;
      var t = template.fill(p);
      $templates = $templates.add(t);
    });
    return $templates;
  };
})(jQuery);
