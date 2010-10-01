dojo.provide('clock.PrefsView');

dojo.require('cujo.mvc.View');

dojo.declare('clock.StorageModel', [dojo.Stateful],
{
	store: null,
	
	constructor: function() {
		this.store = ('localStorage' in window) && window['localStorage'] !== null ? window.localStorage : this;
	},
	
	set: function(name, value) {
		this.store.setItem(name, value);
		this.inherited(arguments);
	},
	
	get: function(name) {
		return this.store.getItem(name);
	},
	
	setItem: function(key, value) {
		this[key] = value;
	},
	
	getItem: function(key) {
		return this[key];
	},
	
	removeItem: function(key) {
		delete this[key];
	}
});

dojo.declare('clock.PrefsView', [cujo.mvc.View],
{
	templateString: cujo.getHtml("clock.PrefsView"),
	
	themes: null,
	
	hours: null,
	
	seconds: null,

	prefsModel: null,
	
	constructor: function() {
		this.prefsModel = dojo.delegate(new clock.StorageModel, {theme: "green", hours: "hr12", "hide-seconds": false});
	},
	
	postCreate: function() {
		this._updateTheme(this.prefsModel.get("theme"));
		this._updateHours(this.prefsModel.get("hours"));
		this._updateHideSeconds(this.prefsModel.get("hide-seconds") == "true");
		dojo.query(".theme", this.themes).onclick(this, function(e) { this._updateTheme(e.target.name); return false; });
		dojo.query(".hour", this.hours).onclick(this, function(e) { this._updateHours(e.target.name); return false; });
		dojo.query(".seconds", this.hours).onclick(this, function(e) { this._updateHideSeconds(this.prefsModel.get("hide-seconds") == "false"); return false; });
	},
	
	_updatePref: function(prefKey, value, all) {
		this.prefsModel.set(prefKey, value);
		dojo.publish("clock/prefs/" + prefKey, [value, all]);
	},
	
	_updateTheme: function(theme) {
		this._updatePref("theme", theme, dojo.query(".theme", this.themes).attr("name"));
	},

	_updateHours: function(hours) {
		this._updatePref("hours", hours, dojo.query(".hour", this.hours).attr("name"));
	},
	
	_updateHideSeconds: function(hide) {
		this._updatePref("hide-seconds", hide);
	}
	
});


