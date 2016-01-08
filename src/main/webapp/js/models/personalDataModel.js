/*global define*/
define([
	'underscore',
	'backbone'
], function(_, Backbone) {
	'use strict';

	var PersonalData = Backbone.Model.extend({
		// Default attributes for personal data
		defaults: {
			firstName: 'Johny',
			lastName: 'Bravo',
			dateOfBirth: '01.04.1987',
			fieldsValid: true
		},

		validate: function(attrs) {
			this.set({'fieldsValid':false});			
			if (!attrs.firstName) {
				return 'First name is empty!';
			}
			if (!attrs.lastName) {
				return 'Last name is empty!';
			}
			if (!attrs.dateOfBirth) {
				return 'Date of birth is empty!';
			}
			this.set({'fieldsValid':true});
		}
	});

	return PersonalData;
});