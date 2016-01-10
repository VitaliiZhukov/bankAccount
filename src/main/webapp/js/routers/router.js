define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
            '': 'data',
            'data': 'data',
            'accounts': 'accounts',
            'success': 'success'
        },

        data: function() {
            $('.block').hide();
            $('#data-container').show();
        },

        accounts: function() {
            $('.block').hide();
            $('#accounts-container').show();
        },
        success: function() {
            $('.block').hide();
            $('#success-container').show();
        },

        initialize: function() {
            Backbone.history.start(); // Set application start state.
        }
    });

    return Router;
});