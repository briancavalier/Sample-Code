dojo.provide('clock.ClockView');

cujo.requireCss('clock.ClockView', {cssx: false});

dojo.require('cujo.mvc.binder');
dojo.require('cujo.mvc.DataBoundView');

dojo.require('clock.PrefsView');

(function () {
	dojo.declare('clock.ClockModel', [dojo.Stateful],
	{
		constructor: function() {
			setInterval(dojo.hitch(this, "_tick"), 1000);
		},

		_tick: function() {
			this.set(this._getTime());
		},

		_getTime: function() {
	        var now = new Date();
			return { hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds(), timezone: (now.toString().match(/\b([A-Z]{1,4}).$/) || [""]).pop() };
		}
	});

	dojo.declare('clock.ClockView', [cujo.mvc.DataBoundView],
	{
	    templateString: cujo.getHtml('clock.ClockView'),

	    widgetsInTemplate: true,

	    dimTime: 10 * 1000,

		dimTimeout: null,
		
		h10: null, h1: null,
		m10: null, m1: null,
		s10: null, s1: null,

		separator: null,

		ampm: null,
		
		_digits: ["d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9"],

		attributeMap: cujo.mvc.binder().inherit(cujo.mvc.DataBoundView)
			.bind('hours').data().derives('displayHours', '_updateDisplay')
			.bind('minutes').data().derives('displayMinutes', '_updateDisplay')
			.bind('seconds').data().derives('displaySeconds', '_updateDisplay')
			.map(),
		
		postMixInProperties: function() {
			var self = this;
			this.subscribe("clock/prefs", function(key, value, all) {
				self.state(all ? { state: value, value: true, set: all } : { state: key, value: value });
				this._updateDisplay();
			});
			var c = new clock.ClockModel();
			this.set("dataItem", c);
			this.inherited(arguments);
		},

	    postCreate: function() {
			this._setupDim();
			dojo.query(dojo.body()).onclick(this, "brighten").onmousemove(this, "brighten");
	    },
	
		_updateDisplay: function() {
			var h = this.get("hours")
				,s = this.get("seconds");
			if (this.state("hr12")) {
				this.state({ state: (h >= 12) ? "pm" : "am", value: true, set: ["am", "pm"], scope: this.ampm});
	            h = (h == 0) ? 12 : (h > 12) ? h % 12 : h;
	        }

			this._updateDigits("hours", h);
			this._updateDigits("minutes", this.get("minutes"));
			this._updateDigits("seconds", s);
			this.state({ state: "on", value: (s % 2 == 0), scope: this.separator});
		},

		_updateDigits: function(name, value) {
			if(value) {
				var scope = name[0];
				this.state({ state: this._digits[Math.floor(value / 10)], value: true, set: this._digits, scope: this[scope + "10"] });
				this.state({ state: this._digits[value % 10], value: true, set: this._digits, scope: this[scope + "1"] });
			}
			return value;
		},

	    brighten: function() {
	        this.state({ state: "dim", value: false, scope: dojo.body() });
	        this._setupDim();
	    },

	    dim: function() {
	        this.state({ state: "dim", value: true, scope: dojo.body() });
	    },

	    _setupDim: function() {
	        clearTimeout(this.dimTimeout);
	        this.dimTimeout = setTimeout(dojo.hitch(this, "dim"), this.dimTime);
	    }

	});
	
})();
