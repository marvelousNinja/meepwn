RouteController.prototype.handleError = function(error) {
  Notifications.send('error', error.toString());
  Router.go(Meteor.userId() ? 'dashboardShow' : 'index');
  this.stop();
}

Router.configure({
  layoutTemplate: 'layout',
  onBeforeAction: function() {
    var userId = Meteor.userId();

    var previousUrl = Session.get('urlBeforeLoginFailure');
    if(userId && previousUrl) {
      delete Session.keys['urlBeforeLoginFailure'];
      return this.redirect(previousUrl);
    }

    if(this.route.getName() === 'index') return this.next();

    if(!userId) {
      Session.set('urlBeforeLoginFailure', this.url);
      return this.handleError(new Meteor.Error(403, 'You need to sign in to access that page'));
    } else {
      this.next();
    }
  },
  waitOn: function() {
    return Meteor.subscribe('projectTrees');
  }
});

Router.map(function() {
  this.route('index', {
    path: '/'
  });

  this.route('dashboardShow', {
    path: '/dashboard'
  });

  this.route('projectsShow', {
    path: '/dashboard/projects/:_id',
    action: function() {
      var project = Projects.findOne(this.params._id);
      if(!project) return this.handleError(new Meteor.Error(404, 'Project was not found'));
      this.render('projectsShow');
    }
  });

  this.route('invitationsNew', {
    path: '/dashboard/projects/:_id/invitations/new',
  });

  this.route('invitationsAccept', {
    path: '/invitations/:_id/accept',
    action: function() {
      var self = this;
      Meteor.call('acceptInvitation', { invitationId: this.params._id }, function(error, projectId) {
        if(error) return self.handleError(error);
        Notifications.send('notice', 'You have accepted the invitation');
        Router.go('projectsShow', { _id: projectId });
      });
      this.stop();
    }
  });
});
