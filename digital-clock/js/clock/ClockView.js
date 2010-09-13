dojo.provide('clock.ClockView');

dojo.require('cujo.mvc.DataBoundView');

dojo.require('clock.DigitView');
dojo.require('clock.SeparatorView');
dojo.require('clock.AMPMView');

dojo.declare('clock.ClockView', [cujo.mvc.DataBoundView],
{
    templateString: dojo.cache('clock', 'templates/ClockView.html'),

    widgetsInTemplate: true,

    dimTime: 10 * 1000,

	dimTimeout: null,

	hoursView: null,

	separatorView: null,
	
	minutesView: null,
	
	secondsView: null,
	
	ampmView: null,

	attributeMap: {
		hours: {
			type: "widget",
			node: "hoursView",
			attribute: "value"
		},
		minutes: {
			type: "widget",
			node: "minutesView",
			attribute: "value"
		},
		seconds: {
			type: "widget",
			node: "secondsView",
			attribute: "value"
		},
		ampm: {
			type: "widget",
			node: "ampmView",
			attribute: "value"
		}
	},
	
	postMixInProperties: function() {
		this.hours = this.minutes = this.seconds = 0;
		this.ampm = null;
		var self = this;
		this.subscribe("clock/prefs", function(key, value, all) { 
			self.state({ state: value, value: true, set: all });
		});
		this.inherited(arguments);
	},
	
    postCreate: function() {
		this._setupDim();
		dojo.query(dojo.body()).onclick(this, "brighten").onmousemove(this, "brighten");
        setInterval(dojo.hitch(this, "_updateTime"), 1000);
    },

    _updateTime: function() {
        var now = new Date()
                ,h = now.getHours()
                ,m = now.getMinutes()
                ,s = now.getSeconds()
                ,nowstr = now.toString()
                ,tz = (nowstr.match(/\b([A-Z]{1,4}).$/) || [""]).pop()
//                ,n = $('.digit')
                ,hr12 = this.state("hr12");
                ;
        dojo.addClass(this.domNode, "tz-" + tz.toLowerCase());
        // If 12hr clock, adjust h for display, and set AM/PM
        if (hr12) {
			this.set("ampm", (h >= 12) ? "pm" : "am");
            h = (h == 0) ? 12 : (h > 12) ? h % 12 : h;
        } else {
			this.set("ampm", null);
		}

		this.separatorView.state("on", (s % 2 == 0));
		this.set({ "hours": h, "minutes": m, "seconds": s });
    },

    brighten: function() {
        this.state("dim", false);
        this._setupDim();
        return true;
    },

    dim: function() {
        this.state("dim", true);
    },

    _setupDim: function() {
        clearTimeout(this.dimTimeout);
        this.dimTimeout = setTimeout(dojo.hitch(this, "dim"), this.dimTime);
    }

});
