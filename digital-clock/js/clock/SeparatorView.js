dojo.provide('clock.SeparatorView');

dojo.require('cujo.mvc.BaseView');

dojo.declare('clock.SeparatorView', [cujo.mvc.BaseView],
{
	templateString: dojo.cache('clock', 'templates/SeparatorView.html'),

    separator: null,

    postCreate: function() {
        var self = this;
        dojo.subscribe("clock/tick", function() {
            dojo.query('.element', self.domNode).toggleClass('on');
        });
    }

});
