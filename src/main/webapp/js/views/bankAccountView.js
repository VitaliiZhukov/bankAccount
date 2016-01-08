/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!../../templates/layouts/bankAccountTpl.html',
], function($, _, Backbone, bankAccountTpl) {
	'use strict';
	var BankAccountView = Backbone.View.extend({

		//tagName: 'li',
		el: '#accounts-list',

		template: _.template(bankAccountTpl),

		// The DOM events specific to an item.
		events: {
			'blur #iban': 'edit',
			'blur #bic': 'edit',
		},

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},

		render: function() {
			console.log(this.model.toJSON());
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