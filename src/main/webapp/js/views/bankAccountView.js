/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!../../templates/layouts/bankAccountTpl.html',
], function($, _, Backbone, bankAccountTpl) {
	'use strict';
	var BankAccountView = Backbone.View.extend({

		tagName: 'li',

		template: _.template(bankAccountTpl),

		// The DOM events specific to an item.
		events: {
			'blur #iban': 'editAccount',
			'blur #bic': 'editAccount',
			'click #account-delete': 'deleteAccount',
		},

		initialize: function() {
			this.$el.html(this.template(this.model.toJSON()));

			this.listenTo(this.model, 'destroy', this.remove); //remove this view after model destroying
			this.listenTo(this.model, 'invalid', this.showErrors);
		},

		render: function() {
			return this.$el;
		},

		editAccount: function() {
			this.hideErrors();

			var account = {
				iban: this.$('#iban').val().toUpperCase(),
				bic: this.$('#bic').val().toUpperCase()
			};
			if (!this.model.set(account, {
					validate: true
				})) {
				this.model.set(account);
			};
		},

		showErrors: function(errors) {
			_.each(errors.validationError, function(error) {
				//this.$('#'+error.name+'-error').text(error.message);
				this.$('#' + error.name + '-container').addClass('has-error');
			}, this);
		},

		hideErrors: function() {
			//this.$('.error').text('');
			this.$('.inputBlock').removeClass('has-error');
		},

		deleteAccount: function() {
			if (this.model.collection.length > 1) {
				this.model.destroy();
			}
		}
	});

	return BankAccountView;
});