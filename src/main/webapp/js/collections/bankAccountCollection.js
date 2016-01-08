/*global define*/
define([
	'underscore',
	'backbone',
	'models/bankAccountModel'
], function(_, Backbone, BankAccountModel) {
	'use strict';

	var BankAccountCollection = Backbone.Model.extend({
		model: BankAccountModel,
		
		// We keep the Todos in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function() {
			return this.length ? this.last().get('order') + 1 : 1;
		},
	});

	return new BankAccountCollection;
});