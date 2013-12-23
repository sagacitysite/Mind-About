define([
    'Marionette',
    'views/pads/list'
], function(
    Marionette,
    ListView
    ) {
    var Controller = Marionette.Controller.extend({
        route_pads_index: function() {
            var view = new ListView();
            App.layout.main.show(view);
        }
    });
    
    return Controller;
    });