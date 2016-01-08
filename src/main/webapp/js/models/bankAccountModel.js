/*global define*/
define([
	'underscore',
	'backbone'
], function(_, Backbone) {
	'use strict';

	var BankAccount = Backbone.Model.extend({
		// Default attributes for bank account data
		defaults: {
			id: '',
			iban: '',
			bic: ''
		},

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
		},
	});

	return BankAccount;
});