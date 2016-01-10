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
			'keyup #firstName, #lastName': 'editData', // Check and edit data on keyup.
			'blur #dateOfBirth': 'editData'			// Check and edit data on focus lost.
		},

		initialize: function() {
			this.model = new PersonalDataModel(); // Create data model.
			this.$el.html(this.template(this.model.toJSON())); // Build DOM element with template.

			this.listenTo(this.model, 'invalid', this.showErrors);
		},

		// Try to set new attributes to data model.
		editData: function(e) {
			this.hideErrors();

			var data = {
				firstName: this.$('#firstName').val(),
				lastName: this.$('#lastName').val(),
				dateOfBirth: this.$('#dateOfBirth').val()
			};

			this.model.set(data, {	// If validation is passed then set new attributes to model. Otherwise'invalid' evend called and errors will be displayed.
				validate: true
			});
		},

		// Show error messages at according inputs.
		showErrors: function(errors) {
			_.each(errors.validationError, function(error) {
				this.$('#' + error.name + '-error').text(error.message);
				this.$('#' + error.name + '-container').addClass('has-error');
			}, this);
		},

		// Hide all error messages.
		hideErrors: function() {
			this.$('.error').text('');
			this.$('.inputBlock').removeClass('has-error');
		}
	});

	return PersonalDataView;
});