/*global define*/
define([
	'underscore',
	'backbone',
	'models/bankAccountModel'
], function(_, Backbone, BankAccount) {
	'use strict';

	var BankAccountCollection = Backbone.Collection.extend({
		model: BankAccount, // collection base model

		// Get order number for next account.
		nextOrder: function() {
			if (!this.length) return 1;
			return this.last().get('order') + 1;
		},

		// Check if all models in collection are valid and not empty.
		checkValidAccounts: function() {
			return this.reduce(function(memo, model) {
				return (memo && model.isValid)
			}, true);
		}
	});

	return BankAccountCollection;
});