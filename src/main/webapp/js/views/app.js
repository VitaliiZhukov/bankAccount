define([
	'backbone',
	'jquery',
	'underscore',
	'views/personalDataView',
	'views/bankAccountView',
	'routers/router',
	'models/appState',
	'collections/bankAccountCollection'
], function(Backbone, $, _, PersonalDataView, BankAccountView,Router, AppState, Accounts) {
	var App = Backbone.View.extend({

		el: '#app-container',

		templates: {
			"start": _.template(''),
			"success": _.template($('#success').html()),
		},

		events: {
			'click #saveData': 'saveData',
			'click #addAccount': 'addAccount',
		},

		initialize: function() {
			console.log('Wahoo!');
			this.$data = this.$('#data-container');
			this.$accounts = this.$('#accounts-container');

			this.personalData = new PersonalDataView();
			this.$data.append(this.personalData.render().el);

			this.appState = new AppState();
			this.router = new Router(this.appState);

			this.addAccount();

			this.render();
		},

		saveData: function() {
			console.log('data saved; valid: ' + this.personalData.model.get('fieldsValid'));
			if (this.personalData.model.get('fieldsValid')) {
				this.appState.set({
					'state': 'success'
				});
				this.render();
			}
		},

		render: function() {
			var state = this.appState.get('state');
			if (state == 'success') {
				this.$el.html(this.templates['success']());
			}

			return this;
		},
		
		addAccount: function() {
			var view = new BankAccountView({});
			this.$accounts.append(view.render().el);
		},
	});

	return App;
});