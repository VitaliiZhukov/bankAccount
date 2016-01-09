/*global define*/
define([
	'underscore',
	'backbone'
], function(_, Backbone) {
	'use strict';

	var BankAccount = Backbone.Model.extend({
		// Default attributes for bank account data
		defaults: {
			order: 1,
			iban: '',
			bic: ''
		},

		fieldsValid: false,

		initialize: function() {
			if (!this.get('iban')) {
				this.set({
					'iban': this.defaults.iban
				});
			}
			if (!this.get('bic')) {
				this.set({
					'bic': this.defaults.bic
				});
			}
			if (!this.get('order')) {
				this.set({
					'order': this.defaults.order
				});
			}
		},

		validate: function(attrs) {
			this.fieldsValid = false;
			var ibanRe = /[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}/,
				bicRe = /([a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?)/;

			var ibanIsValid = ibanRe.test(attrs.iban);
			var bicIsValid = bicRe.test(attrs.bic);

			this.fieldsValid = ibanIsValid && bicIsValid;
		}

	});

	return BankAccount;
});