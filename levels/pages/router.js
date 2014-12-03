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

var handleError = function(error) {
  Notifications.send('error', error.toString());
  Router.go('dashboard');
}

var waitForSignIn = function() {
  if(Meteor.userId()) this.next();
}

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('dashboard', { path: '/dashboard' });
  this.route('invite', { path: '/dashboard/projects/:_id/invitations/new' });

  this.route('project', {
    path: '/dashboard/projects/:_id',
    before: waitForSignIn,
    action: function() {
      var project = Projects.findOne(this.params._id);
      if(!project) handleError(new Meteor.Error(404, 'Project was not found'));
      this.render('project');
    }
  });

  this.route('accept', {
    path: '/invitations/:_id/accept',
    before: waitForSignIn,
    action: function() {
      Meteor.call('acceptInvitation', { invitationId: this.params._id }, function(error, projectId) {
        if(error) {
          handleError(error);
        } else {
          Notifications.send('notice', 'You have accepted the invitation');
          Router.go('project', { _id: projectId});
        }
      });
      this.stop();
    }
  });
});
