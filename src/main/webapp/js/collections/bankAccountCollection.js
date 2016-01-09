/*global define*/
define([
	'underscore',
	'backbone',
	'models/bankAccountModel'
], function(_, Backbone, BankAccount) {
	'use strict';

	var BankAccountCollection = Backbone.Collection.extend({
		model: BankAccount, // collection base model
	});

	return BankAccountCollection;
});