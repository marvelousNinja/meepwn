Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('projects', { path: '/projects' });
  this.route('project', { path: '/projects/:_id' });
});
