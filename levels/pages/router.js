Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('projects', { path: '/projects' });
  // TODO: I hate to admit the fact that data should be sent here
  this.route('project', {
    path: '/projects/:_id',
    data: function() {
      return { projectId: new Mongo.ObjectID(this.params._id) };
    }
  });
});
