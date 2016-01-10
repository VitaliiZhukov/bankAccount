/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!../../templates/layouts/personalDataTpl.html',
	'models/personalDataModel'
], function($, _, Backbone, personalDataTpl, PersonalDataModel) {
	'use strict';

	var PersonalDataView = Backbone.View.extend({

		template: _.template(personalDataTpl),

		events: {
			'blur #firstName, #lastName, #dateOfBirth': 'editData',
		},

		initialize: function() {
			this.model = new PersonalDataModel();
			//this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'invalid', this.showErrors);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		// submitData: function(e) {
		// 	e.preventDefault();

		// 	this.hideErrors();

		// 	var personalData = {
		// 		firstName: this.$('#firstName').val(),
		// 		lastName: this.$('#lastName').val(),
		// 		dateOfBirth: this.$('#dateOfBirth').val()
		// 	};

		// 	return(this.model.set(personalData, {
		// 		validate: true
		// 	}));
		// },

		editData: function() {
			this.hideErrors();

			var data = {
				firstName: this.$('#firstName').val(),
				lastName: this.$('#lastName').val(),
				dateOfBirth: this.$('#dateOfBirth').val()
			};
			if (!this.model.set(data, {
					validate: true
				})) {
				this.model.set(data);
			};
		},

		showErrors: function(errors) {
			_.each(errors.validationError, function(error) {
				this.$('#'+error.name+'-error').text(error.message);
				this.$('#' + error.name + '-container').addClass('has-error');
			}, this);
		},

		hideErrors: function() {
			this.$('.error').text('');
			this.$('.inputBlock').removeClass('has-error');
		}
	});

	return PersonalDataView;
});