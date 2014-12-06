this.Projects = new Meteor.Collection('projects');

Projects.after.insert(function(userId, project) {
  Directories.insert({ name: project.name, projectId: project._id });
});

Projects.after.remove(function(userId, project) {
  Files.remove({ projectId: project._id });
  Directories.remove({ projectId: project._id });
});
