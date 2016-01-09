/*global define*/
define([
	'underscore',
	'backbone'
], function(_, Backbone) {
	'use strict';

	var PersonalData = Backbone.Model.extend({
		// Default attributes for personal data
		defaults: {
			firstName: '',
			lastName: '',
			dateOfBirth: ''
		},

		fieldsValid: false,

		validate: function(attrs) {
			var errors = [];
			this.fieldsValid = false;

			var nameRe = /^[a-zA-Z ]+$/,
				dateRe = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
				//dateRe = ^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$;

			var firstNameIsValid = (!!attrs.firstName) && (nameRe.test(attrs.firstName));
			var lastNameIsValid = (!!attrs.lastName) && (nameRe.test(attrs.lastName));
			var dateOfBirthIsValid = dateRe.test(attrs.dateOfBirth);

			if (!firstNameIsValid){
				errors.push({name:'firstName',message:'Please fill name correctly.'});
			}

			if (!lastNameIsValid){
				errors.push({name:'lastName',message:'Please fill last name correctly.'});
			}

			if (!dateOfBirthIsValid){
				errors.push({name:'dateOfBirth',message:'Please fill date of birth correctly.'});
			}

			this.fieldsValid = firstNameIsValid && lastNameIsValid && dateOfBirthIsValid;
			return errors.length > 0 ? errors : false;

			// if (!this.fieldsValid) {
			// 	return 'Invalid values!';
			// }
		}
	});

	return PersonalData;
});