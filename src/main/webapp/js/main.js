require.config({
	paths: {
		'jquery': 'libs/jquery/dist/jquery.min',
		'underscore': 'libs/underscore/underscore-min',
		'backbone': 'libs/backbone/backbone-min',
		'text': 'libs/requirejs-text/text'
	}
});

require([
	'views/app',
], function(AppView) {
	new AppView();// start application
});