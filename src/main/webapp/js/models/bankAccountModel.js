/*global define*/
define([
	'underscore',
	'backbone'
], function(_, Backbone) {
	'use strict';

	var BankAccount = Backbone.Model.extend({
		defaults: {
			order: 1,
			iban: '',
			bic: ''
		},

		isValid: false,

		validate: function(attrs) {
			var errors = [];

			var ibanRe = /[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}/,
				bicRe = /([a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?)/;

			var ibanIsValid = ibanRe.test(attrs.iban.replace(/[ -]+/g, ''));
			var bicIsValid = bicRe.test(attrs.bic.replace(/[ -]+/g, ''));

			if (!ibanIsValid && attrs.iban) {
				errors.push({
					name: 'iban',
					message: 'Please fill IBAN correctly.'
				});
			}

			if (!bicIsValid && attrs.bic) {
				errors.push({
					name: 'bic',
					message: 'Please fill BIC name correctly.'
				});
			}

			this.isValid = (!!attrs.iban) && (!!attrs.bic) && !(errors.length > 0);
			return errors.length > 0 ? errors : false;
		}
	});

	return BankAccount;
});