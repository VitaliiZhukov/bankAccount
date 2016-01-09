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
			'blur #account-iban': 'edit',
			'blur #account-bic': 'edit',
			'click #account-delete': 'deleteAccount',
		},

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove); //remove this view after model destroying
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this.$el;
		},

		edit: function() {
			this.model.set({
				iban: this.$('#iban').text(),
				bic: this.$('#bic').text(),
			}, {
				validate: true
			});
		},

		deleteAccount: function() {
			this.model.destroy();
		}
	});

	return BankAccountView;
});