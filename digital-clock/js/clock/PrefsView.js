dojo.provide('clock.PrefsView');

dojo.require('cujo.mvc.View');

dojo.declare('clock.PrefsView', [cujo.mvc.View],
{
	templateString: dojo.cache("clock", "templates/PrefsView.html"),
	
	themes: null,
	
	hours: null,
	
	postCreate: function() {
		this._updateTheme("green");
		this._updateHours(12);
		dojo.query(".theme", this.themes).onclick(this, function(e) {
			this._updateTheme(e.target.name);
		});
		dojo.query(".hour", this.hours).onclick(this, function(e) {
			this._updateHours(e.target.name);
		});
	},
	
	_updatePref: function(prefKey, value, all) {
		dojo.publish("clock/prefs", [prefKey, value, all]);
	},
	
	_updateTheme: function(theme) {
		this._updatePref("theme", theme, dojo.query(".theme", this.themes).attr("name"));
	},

	_updateHours: function(hours) {
		this._updatePref("hours", "hr"+hours, dojo.query(".hour", this.hours).map(function(n) { return "hr"+n.name; }));
	}
	
});


