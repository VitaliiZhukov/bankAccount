/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!../../templates/layouts/bankAccountTpl.html',
	'models/bankAccountModel'
], function($, _, Backbone, bankAccountTpl, BankAccountModel) {
	'use strict';
	var BankAccountView = Backbone.View.extend({

		//tagName: 'li',
		el: '#accounts-container',

		template: _.template(bankAccountTpl),

		// The DOM events specific to an item.
		events: {
			'blur #iban': 'edit',
			'blur #bic': 'edit',
		},

		initialize: function() {
			this.model = new BankAccountModel();
			this.listenTo(this.model, 'change', this.render);
		},

		render: function() {
			console.log(this.$el);
			this.$el.append(this.template(this.model.toJSON()));
			return this;
		},
		edit: function() {
			this.model.set({
				iban: this.$('#iban').text(),
				bic: this.$('#bic').text(),
			}, {
				validate: true
			});
		},
	});
	return BankAccountView;
});