define([
    'Marionette',
    'views/register'
], function(
    Marionette,
    RegisterView
    ) {
    var Controller = Marionette.Controller.extend({
        route_register_index: function() {
            var view = new RegisterView();
            App.layout.content.show(view);
        }
    });
    
    return Controller;
    });
