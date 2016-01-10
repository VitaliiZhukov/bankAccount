/*global define*/
define([
	'underscore',
	'backbone'
], function(_, Backbone) {
	'use strict';

	var PersonalData = Backbone.Model.extend({
		defaults: {
			firstName: '',
			lastName: '',
			dateOfBirth: ''
		},

		isValid: false, // This parameter is used to check if there are any initial empty attributes in this model. Empty attributes mean model is not valid.

		validate: function(attrs) {
			var errors = [];

			var nameRe = /^[a-zA-Z ]+$/, // Only latin letters.
				dateRe = /^\d{2}[./-]\d{2}[./-]\d{4}$/; 
			//dateRe = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

			var firstNameIsValid = nameRe.test(attrs.firstName);
			var lastNameIsValid = nameRe.test(attrs.lastName);
			var dateOfBirthIsValid = dateRe.test(attrs.dateOfBirth);

			if (!firstNameIsValid && attrs.firstName) {
				errors.push({
					name: 'firstName',
					message: 'Please fill name correctly.'
				});
			}

			if (!lastNameIsValid && attrs.lastName) {
				errors.push({
					name: 'lastName',
					message: 'Please fill last name correctly.'
				});
			}

			if (!dateOfBirthIsValid && attrs.dateOfBirth) {
				errors.push({
					name: 'dateOfBirth',
					message: 'Please fill date of birth correctly.'
				});
			}

			this.isValid = (!!attrs.firstName) && (!!attrs.lastName) && (!!attrs.dateOfBirth) && (errors.length === 0);

			if (JSON.stringify(attrs) === JSON.stringify(this)) { // If attributes have the same values as model then initiate change event for updating application state.
				this.trigger('change',this); 
			}
			return errors.length > 0 ? errors : false;
		}
	});

	return PersonalData;
});