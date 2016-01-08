/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!../../templates/layouts/personalDataTpl.html',
	'models/personalDataModel'
], function($, _, Backbone, personalDataTpl,PersonalDataModel) {
	'use strict';

	var PersonalDataView = Backbone.View.extend({

		//tagName:  'li',
		//el: '#data-fieldset',

		template: _.template(personalDataTpl),

		// The DOM events specific to an item.
		events: {
			'blur #firstName': 'edit',
			'blur #lastName': 'edit',
			'blur #dateOfBirth': 'edit'
		},

		// The TodoView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Todo** and a **TodoView** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function() {
			this.model = new PersonalDataModel();
			this.listenTo(this.model, 'change', this.render);
			console.log('data created');
		},

		// Re-render the titles of the todo item.
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		// Switch this view into `"editing"` mode, displaying the input field.
		edit: function() {
			this.model.set({
				firstName: this.$('#firstName').val(),
				lastName: this.$('#lastName').val(),
				dateOfBirth: this.$('#dateOfBirth').val()
			}, {
				validate: true
			});
			//if (!res) this.render();
		}

	});

	return PersonalDataView;
});