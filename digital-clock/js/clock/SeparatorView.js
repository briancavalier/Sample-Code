dojo.provide('clock.SeparatorView');

dojo.require('cujo.mvc.View');

dojo.declare('clock.SeparatorView', [cujo.mvc.View],
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
