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

		el: '#app-container', // Set application DOM element.

		// define event handlers on buttons click.
		events: {
			'click #data-next': 'moveNext',
			'click #accounts-add': 'addAccount',
			'click #accounts-save': 'save',
		},

		initialize: function() {
			this.personalData = new PersonalDataView();
			this.$('#data-fieldset').html(this.personalData.render().el); // Render personal data view in specified block.

			this.accCollection = new BankAccountCollection(); // Create empty collection of bank account views.

			this.listenTo(this.accCollection, 'add', this.addViewAccount); // Bind view event handlers to collection events.
			this.listenTo(this.accCollection, 'change', this.checkAccountsState);
			this.listenTo(this.accCollection, 'invalid', this.checkAccountsState);
			this.listenTo(this.accCollection, 'remove', this.checkAccountsState);
			this.listenTo(this.accCollection, 'add', this.checkAccountsState);

			this.listenTo(this.personalData.model, 'change', this.checkDataState); // Bind view event handlers to personal data model events.
			this.listenTo(this.personalData.model, 'invalid', this.disableNext);

			this.router = new Router();
		},

		// Check collection state. If all bank accounts are valid then enable buttons "Save" and "Add account".
		checkAccountsState: function() {
			var accountsValid = this.accCollection.checkValidAccounts();
			this.$('#accounts-save').prop('disabled', !accountsValid);
			this.$('#accounts-add').prop('disabled', !accountsValid);
		},

		// Check personal data model state. If it is filled correctly then enable "Next" button.
		checkDataState: function() {
			this.$('#data-next').prop('disabled', !this.personalData.model.isValid);
		},

		// Disable next button on invalid event on personal data model setting attempt.
		disableNext: function() {
			this.$('#data-next').prop('disabled', true);
		},

		// Next button pressed. Default account is added if collection is empty and router goes to 'accounts' state.
		moveNext: function() {
			if (this.accCollection.length === 0) {
				this.addAccount();
			}
			this.router.navigate('accounts', {
				trigger: true
			});
			return false;
		},

		// Add new account to collection with keeping order number.
		addAccount: function() {
			this.accCollection.add({
				order: (this.accCollection.nextOrder())
			});
		},

		// Account view is created and added to form on new account adding.
		addViewAccount: function(acc) {
			var view = new BankAccountView({
				model: acc
			});
			this.$('#accounts-list').append(view.render());
		},

		// Save button pressed. Router goes to 'success' state.
		// Result object with personal data and account collection  is displayed in proper div.
		save: function() {
			this.router.navigate('success', {
				trigger: true
			});

			var result = {
				personalData: this.personalData.model,
				accounts: this.accCollection
			};

			this.$('#success-json').html(JSON.stringify(result));
			return false;
		}
	});

	return App;
});