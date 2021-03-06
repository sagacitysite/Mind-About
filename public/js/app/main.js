(function() {
  requirejs.config({
    paths: {
      text: '../vendor/text',
      hbs: '../vendor/hbs',
      jquery: '../vendor/jquery.min',
      jquerycookie: '../vendor/jquery.cookie.min',
      jquerycountdown: '../vendor/jquery.countdown.min',
      underscore: '../vendor/underscore-min',
      backbone: '../vendor/backbone-min',
      //Backbone: '../vendor/backbone-min',
      BackboneRouteFilter: '../vendor/backbone.routefilter.min',
      Marionette: '../vendor/backbone.marionette.min',
      handlebars: '../vendor/handlebars',
      ember: '../vendor/ember.min',
      etherpad: '../vendor/etherpad',
      Session: 'models/session',
      User: 'models/user'
    },
    shim: {
      jquery: {
        exports: 'jQuery'
      },
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ['jquery', 'underscore'],
        exports: 'backbone'
      },
      BackboneRouteFilter: {
        deps: ['backbone'],
        exports: 'BackboneRouteFilter'
      },
      Marionette: {
        deps: ['jquery', 'underscore', 'backbone'],
        exports: 'Marionette'
      },
      handlebars: {
        exports: 'Handlebars'
      }
    },
    hbs: {
      disableI18n: true,
      templateExtension: '.html'
    }
  });
  
  require(['underscore','backbone','Session','router'], function(_, Backbone, Session, AuthRouter) {
    var modules = {
        core: 'modules/core'
    };

    var files_to_load = [
      'application'
    ];

    _.each(modules, function(module) {
      files_to_load.push(module);
    });

    require(files_to_load, function(Application) {
      
      // Create a new session model and scope it to the app global
      // This will be a singleton, which other modules can access
      Application.session = new Session({});
      //Application.router = new AuthRouter({});
      
      var app = window.App = new Application();
      var module_names = _.keys(modules);

      // initialize modules
      _.each(_.rest(arguments, 1), function(module, index) {
        app.module(module_names[index], module);
      });

      /*// Check the auth status upon initialization,
      // before rendering anything or matching routes
      Application.session.checkAuth({
            // Start the backbone routing once we have captured a user's auth status
            complete: function() {
                // HTML5 pushState for URLs without hashbangs
                var hasPushstate = !!(window.history && history.pushState);
                if(hasPushstate) Backbone.history.start({ pushState: true, root: '/' } );
                else Backbone.history.start({ pushState: false, root: '/' });
            }
      });*/
      
      app.start();
      Backbone.history.start({ pushState: false, root: '/' });
      
      /*// All navigation that is relative should be passed through the navigate
      // method, to be processed by the router. If the link has a `data-bypass`
      // attribute, bypass the delegation completely.
      $('#content-app').on("click", "a:not([data-bypass])", function(evt) {
          evt.preventDefault();
          var href = $(this).attr("href");
          Application.router.navigate(href, { trigger : true, replace : false } );
      });*/
    });
  });
})();