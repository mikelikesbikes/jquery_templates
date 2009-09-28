(function($) {

  module("when a template is created", {
    setup: function() {
      this.source = '<li class="__class_name__">__content__</li>';
      $("#template").append($(this.source));
    },
    teardown: function() {
      $("#template").empty();
    }
  });
  test("it should be able to be created from html source", function() {
    var template = new $.Template(this.source);
    equals(template.str, this.source);
  });
  
  test("it should be able to be created from jquery selector", function() {
    var template = new $.Template("#template li");
    equals(template.str, this.source);
  });
  
  test("it should be able to be created from jquery object", function() {
    var template = new $.Template($("#template li"));
    equals(template.str, this.source);
  });

  module("before a template is filled", {
    setup: function(){
      this.params = {"class_name": "template_class", "content": "template content"};
      this.beforeFill = function(){
        this.beforeFillCalled = true;
        this.instanceofTemplate = (this instanceof $.Template);
        return false;
      };
      this.template = new $.Template('<li class="__class_name__">__content__</li>', {"beforeFill":this.beforeFill});
      this.template.beforeFillCalled = false;
    }
  });
  test("it should fire the 'beforeFill' callback", function(){
    this.template.fill(this.params);
    same(this.template.beforeFillCalled, true);
  });
  test("it should pass the template to 'beforeFill' as 'this'", function(){
    this.template.fill(this.params);
    same(this.template.instanceofTemplate, true);
  });
  test("it should not fill the template if 'beforeFill' returns false", function(){
    var actual = this.template.fill(this.params);
    equals(actual, '');
  });
  
  module("when a template is filled", {
    setup: function() {
      this.template = new $.Template('<li class="__class_name__">__content__</li>');
    }
  });
  test("it should replace variable names with parameter values", function() {
    var actual = this.template.fill({"class_name": "template_class", "content": "content"});
    equals(actual, '<li class="template_class">content</li>');
  });
  test("it should replace variables with no parameter value with blank", function() {
    var actual = this.template.fill({});
    equals(actual, '<li class=""></li>');
  });
  
  module("when a template is used as a parameter to jQuery.domManip", {
    setup: function() {
      this.template = new $.Template('<li class="__class_name__">__content__</li>');
      this.target = $("#target");
      this.template.fillCalled = false;
      this.template.fill = function() {
        this.fillCalled = true;
        return "<b>template string</b>";
      };
    }
  });
  test("it should evaluate the template", function() {
    this.target.prepend(this.template, {"class_name": "template_class", "content": "template content"});
    equals(this.target.children().length, 1);
  });
  test("it should add the evaluated template", function() {
    this.target.prepend(this.template, {"class_name": "template_class", "content": "template content"});
    ok(this.template.fillCalled);
  });

  module("after a template is filled", {
    setup: function(){
      this.params = {"class_name": "template_class", "content": "template content"};
      this.afterFill = function(){
        this.afterFillCalled = true;
        this.instanceofTemplate = (this instanceof $.Template);
      };
      this.template = new $.Template('<li class="__class_name__">__content__</li>', {"afterFill":this.afterFill});
      this.template.afterFillCalled = false;
    }
  });
  test("it should fire the 'afterFill' callback", function(){
    this.template.fill(this.params);
    same(this.template.afterFillCalled, true);
  });
  test("it should pass the template to 'afterFill' as 'this'", function(){
    this.template.fill(this.params);
    same(this.template.instanceofTemplate, true);
  });

  module("when zero matched elements are templatized", {
    setup: function(){
      this.params = {"class_name": "template_class", "content": "template content"};
      window.afterFillCalled = false;
      this.afterFill = function(){
        window.afterFillCalled = true;
      };
    },
    teardown: function(){
      window.afterFillCalled = undefined;
    }
  });
  test("it should return an empty jQuery object", function(){
    var actual = $([]).templatize();
    equals(actual.length, $([]).length);
  });
  test("it should not fill any templates", function(){
    var actual = $([]).templatize(this.params, {"afterFill": this.afterFill});
    same(window.afterFillCalled, false);
  });

  module("when one or more matched elements are templatized", {
    setup: function(){
      this.source = '<li class="__class_name__">__content__</li><li class="__class_name__">__content__</li>';
      $("#template").append($(this.source));
      this.params = {"class_name": "template_class", "content": "template content"};
      window.afterFillCount = 0;
      this.afterFill = function(){
        window.afterFillCount++;
      };
    },
    teardown: function(){
        $("#template").empty();
      }
  });
  test("it should fill a template for each matched element", function(){
    var actual = $("#template li").templatize(this.params, {"afterFill": this.afterFill});
    equals(window.afterFillCount, 2);
  });
  test("it should return a jQuery object matching the filled template(s)", function(){
    var $actual = $("#template li").templatize(this.params);
    var $expect = $('<li class="template_class">template content</li>').add('<li class="template_class">template content</li>');
    var actual = $.trim($('<div>').append($actual).remove().html());
    var expect = $.trim($('<div>').append($expect).remove().html());
    equals(actual, expect);
  });
  test("it should be able to fill all matched templates with one parameter hash", function(){
    var params = {"class_name": "template_class", "content": "template content"};
    var $actual = $("#template li").templatize(params);
    var $expect = $('<li class="template_class">template content</li>').add('<li class="template_class">template content</li>');
    var actual = $.trim($('<div>').append($actual).remove().html());
    var expect = $.trim($('<div>').append($expect).remove().html());
    equals(actual, expect);
  });
  test("it should be able to fill each matched template with a respective parameter hash from an array of hashes", function(){
    var params = [{"class_name": "template_class1", "content": "template content1"}, {"class_name": "template_class2", "content": "template content2"}];
    var $actual = $("#template li").templatize(params);
    var $expect = $('<li class="template_class1">template content1</li>').add('<li class="template_class2">template content2</li>');
    var actual = $.trim($('<div>').append($actual).remove().html());
    var expect = $.trim($('<div>').append($expect).remove().html());
    equals(actual, expect);
  });
  
})(jQuery);
