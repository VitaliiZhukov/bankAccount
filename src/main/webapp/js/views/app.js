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

			this.accCollection = new BankAccountCollection();
			this.listenTo(this.accCollection, 'add', this.addViewAccount);
			//this.listenTo(this.accCollection, 'remove', this.);

			this.appState = new AppState();
			this.router = new Router(this.appState);
		},

		moveNext: function(e) {
			if (this.personalData.submitData(e)) {
				this.appState.set({
					'state': 'next'
				});
				this.$el.html(this.templates['next']());
				this.$accounts = this.$('#accounts-list');
				this.addAccount();
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
			console.log('Collection length: ' + this.accCollection.length);
			return this;
		},

		addAccount: function() {
			this.accCollection.add({
				order: (this.accCollection.length + 1)
			});
			console.log(this.accCollection.toJSON());
		},

		addViewAccount: function(acc) {
			var view = new BankAccountView({
				model: acc
			});
			this.$accounts.append(view.render());
		}
	});

	return App;
});