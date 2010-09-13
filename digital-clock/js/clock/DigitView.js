dojo.provide('clock.DigitView');

dojo.require('cujo.mvc.View');

dojo.declare('clock.DigitView', [cujo.mvc.View],
{
	templateString: dojo.cache('clock', 'templates/DigitView.html'),
	
	tens: null,
	
	ones: null,
	
	postCreate: function() {
		this.watch("value", dojo.hitch(this, "_updateView"));
	},
	
	_updateView: function(name, oldVal, value) {
		dojo.query(".digit", this.domNode).removeClass(["d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9"]);
		dojo.addClass(this.tens, "d" + Math.floor(value / 10));
		dojo.addClass(this.ones, "d" + (value % 10));
	}
	
	// set: function(name, value) {
	// 	if(name == "value") {
	// 		dojo.query(".digit", this.domNode).removeClass(["d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9"]);
	// 		dojo.addClass(this.tens, "d" + Math.floor(value / 10));
	// 		dojo.addClass(this.ones, "d" + (value % 10));
	// 	}
	// }
});
