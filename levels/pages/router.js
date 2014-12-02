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
        Notifications.send('error', 'You need to sign in to access that page');
        this.redirect('/');
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
