define([
	'backbone',
	'jquery',
	'underscore',
	'views/personalDataView',
	'views/bankAccountView',
	'routers/router',
	'models/appState',
	'collections/bankAccountCollection'
], function(Backbone, $, _, PersonalDataView, BankAccountView, Router, AppState, BankAccountCollection) {
	var App = Backbone.View.extend({

		el: '#app-container',

		templates: {
			//"start": _.template('#data-fieldse'),
			'next': _.template($('#accounts-container').html()),
			'success': _.template($('#success-container').html()),
		},

		events: {
			'click #data-next': 'moveNext',
			'click #accounts-add': 'addAccount',
			'click #accounts-save': 'save',
		},

		initialize: function() {
			console.log('Wahoo!');
			this.$data = this.$('#data-fieldset');

			this.personalData = new PersonalDataView();
			this.$data.append(this.personalData.render().el);

			this.accounts = new BankAccountCollection();
			//this.listenTo(this.accounts, 'add', this.addViewAccount);
			//this.listenTo(this.accounts, 'all', this.render);

			this.appState = new AppState();
			this.router = new Router(this.appState);


			this.render;
		},

		moveNext: function() {
			if (this.personalData.model.get('fieldsValid')) {
				this.appState.set({
					'state': 'next'
				});
				this.$el.html(this.templates['next']());
				this.$accounts = this.$('#accounts-list');
				this.addAccount();
				this.render();
			}
		},

		save: function() {
			this.appState.set({
				'state': 'success'
			});
			this.render();
		},

		render: function() {
			var state = this.appState.get('state');
			if (state === 'success') {
				this.$el.html(this.templates['success']());
			}

			return this;
		},

		addAccount: function() {
			this.accounts.add({'order':this.accounts.length+1});
			var view = new BankAccountView({model:this.accounts.last()});
			this.$accounts.append(view.render());
		},

		// addViewAccount: function() {
		// 	var view = new BankAccountView({});
		// 	this.$accounts.append(view.render().el);
		// }
	});

	return App;
});