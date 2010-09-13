dojo.provide('clock.AMPMView');

dojo.require('cujo.mvc.BaseView');

dojo.declare('clock.AMPMView', [cujo.mvc.BaseView],
{
	templateString: dojo.cache('clock', 'templates/AMPMView.html'),
	
	postCreate: function() {
		this.watch("value", dojo.hitch(this, "_updateView"));
	},
	
	_updateView: function(name, oldVal, newVal) {
		if(!newVal) {
			this.state("am", false);
			this.state("pm", false);
		} else {
			this.state({ state: newVal, set: ["am", "pm"], value: true });
		}
	}
});
