require.config({
	paths: {
		'jquery': '../node_modules/jquery/dist/jquery.min',
		'underscore': '../node_modules/backbone/node_modules/underscore/underscore-min',
		'backbone': '../node_modules/backbone/backbone-min',
		'text': '../node_modules/requirejs-text/text'
	}
});

require([
	'views/app',
], function(AppView) {
	new AppView();// start application
});