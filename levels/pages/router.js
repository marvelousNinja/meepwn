Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('dashboard', { path: '/dashboard' });
  this.route('project', { path: '/dashboard/projects/:_id' });
});
