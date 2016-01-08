define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
            "": "start",
            "!/": "start",
            "!/success": "success",
        },

        start: function() {
            appState.set({
                state: "start"
            });
        },

        success: function() {
            appState.set({
                state: "success"
            });
        },
    });

    return Router;
});