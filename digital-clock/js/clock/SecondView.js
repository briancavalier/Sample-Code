dojo.provide('clock.SecondView');

dojo.declare('clock.SecondView', [clock.DigitView],
{
	templateString: dojo.cache('clock', 'templates/SecondView.html')
});
