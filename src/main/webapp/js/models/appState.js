define([
	'underscore',
	'backbone'
], function(_, Backbone) {
	'use strict';

	var AppState = Backbone.Model.extend({
		defaults: {
			state: 'start'
		}
	});

	return AppState;
});