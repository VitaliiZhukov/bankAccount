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

		// templates: {
		// 	'success': _.template($('#success-container').html()),
		// },
		successTemplate: _.template($('#success-container').html()),

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

			this.router = new Router(this.appState);
		},

		moveNext: function(e) {
			if (this.personalData.submitData(e)) {
				this.$el.html(_.template($('#accounts-container').html()));
				this.$accounts = this.$('#accounts-list');
				this.addAccount();
			}
		},

		save: function() {
			if (this.accCollection.checkValidAccounts()) {
				this.$el.html(this.successTemplate);
			}
		},

		addAccount: function() {
			if (this.accCollection.checkValidAccounts()) {
				this.accCollection.add({
					order: (this.accCollection.nextOrder())
				});
			}
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