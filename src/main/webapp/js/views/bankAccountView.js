/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!../../templates/layouts/bankAccountTpl.html',
], function($, _, Backbone, bankAccountTpl) {
	'use strict';
	var BankAccountView = Backbone.View.extend({

		tagName: 'li', // View is rendered as horizontal list element. 

		template: _.template(bankAccountTpl), // Set template for bank account.

		// The DOM events specific to an item. Model is edited on input lost focus.
		events: {
			'blur #iban': 'editAccount',
			'blur #bic': 'editAccount',
			'click #account-delete': 'deleteAccount',
		},

		initialize: function() {
			this.$el.html(this.template(this.model.toJSON())); // Build DOM element with template.

			this.listenTo(this.model, 'destroy', this.remove); // Remove this view after model destroying.
			this.listenTo(this.model, 'invalid', this.showErrors);
		},

		render: function() {
			return this.$el;
		},

		// Set new attributes to account model.
		editAccount: function() {
			this.hideErrors(); // Remove all error messages.

			var account = {
				iban: this.$('#iban').val().toUpperCase(),
				bic: this.$('#bic').val().toUpperCase()
			};

			this.model.set(account, { // If validation is passed then set new attributes to model. Otherwise'invalid' evend called and errors will be displayed.
				validate: true
			});
		},

		// Show errors if validation is wrong.
		showErrors: function(errors) {
			_.each(errors.validationError, function(error) {
				this.$('#' + error.name + '-error').text(error.message);
				this.$('#' + error.name + '-container').addClass('has-error');
			}, this);
		},

		// Hide errors.
		hideErrors: function() {
			this.$('.error').text('');
			this.$('.inputBlock').removeClass('has-error');
		},

		// Delete this views model.
		deleteAccount: function() {
			if (this.model.collection.length > 1) { // At least one account has to excist.
				this.model.destroy();
			}
		}
	});

	return BankAccountView;
});