Router.configure({
  layoutTemplate: 'layout',
  onBeforeAction: function() {
    var availableWithoutLogin = ['index'];
    if(_.include(availableWithoutLogin, this.route.getName())) {
      return this.next();
    }

    var user = Meteor.user();
    if(!user) {
      if(Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else {
        Session.set('urlBeforeLoginFailure', this.url);
        Notifications.send('error', 'You need to sign in to access that page');
        this.redirect('/');
      }
    } else {
      var urlBeforeLoginFailure = Session.get('urlBeforeLoginFailure');
      if(urlBeforeLoginFailure) {
        delete Session.keys['urlBeforeLoginFailure'];
        this.redirect(urlBeforeLoginFailure);
      }
    }

    return this.next();
  }
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('dashboard', { path: '/dashboard' });
  this.route('project', { path: '/dashboard/projects/:_id' });
});
