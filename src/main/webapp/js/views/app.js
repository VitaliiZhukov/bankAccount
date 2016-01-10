define([
	'backbone',
	'jquery',
	'underscore',
	'views/personalDataView',
	'views/bankAccountView',
	'routers/router',
	'collections/bankAccountCollection'
], function(Backbone, $, _, PersonalDataView, BankAccountView, Router, BankAccountCollection) {
	var App = Backbone.View.extend({

		el: '#app-container',

		successTemplate: _.template($('#success-container').html()), 

		events: {
			'click #data-next': 'moveNext',
			'click #accounts-add': 'addAccount',
			'click #accounts-save': 'save',
		},

		initialize: function() {
			console.log('Wahoo!');

			this.personalData = new PersonalDataView();
			this.$('#data-fieldset').html(this.personalData.render().el);

			this.accCollection = new BankAccountCollection();
			this.listenTo(this.accCollection, 'add', this.addViewAccount);
			this.listenTo(this.accCollection, 'change', this.checkAccountsState);
			this.listenTo(this.accCollection, 'remove', this.checkAccountsState);
			this.listenTo(this.accCollection, 'add', this.checkAccountsState);
			this.listenTo(this.personalData.model, 'change', this.checkDataState);

			this.router = new Router();
		},

		checkAccountsState: function() {
			var accountsValid = this.accCollection.checkValidAccounts();
			this.$('#accounts-save').prop('disabled', !accountsValid);
			this.$('#accounts-add').prop('disabled', !accountsValid);
		},

		checkDataState: function() {
			this.$('#data-next').prop('disabled', !this.personalData.model.isValid);
		},

		moveNext: function(e) {
			this.$el.html(_.template($('#accounts-container').html()));
			this.addAccount();
		},

		addAccount: function() {
			this.accCollection.add({
				order: (this.accCollection.nextOrder())
			});
		},

		addViewAccount: function(acc) {
			var view = new BankAccountView({
				model: acc
			});
			this.$('#accounts-list').append(view.render());
		},

		save: function() {
			this.$el.html(this.successTemplate);

			var result = {
				personalData: this.personalData.model,
				accounts: this.accCollection
			};

			this.$('#success-json').html(JSON.stringify(result));
		}
	});

	return App;
});