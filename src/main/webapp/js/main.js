require.config({
	paths: {
		'jquery': '../node_modules/jquery/dist/jquery',
		'underscore': '../node_modules/underscore/underscore',
		'backbone': '../node_modules/backbone/backbone',
		'text': '../node_modules/requirejs-text/text'
	}
});


require([
	'views/app',
], function(AppView) {
	new AppView();
});