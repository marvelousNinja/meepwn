this.Projects = new Meteor.Collection('projects');

Projects.helpers({
  rootDirectory: function() {
    return Directories.findOne(this.rootDirectoryId);
  }
});

Projects.after.insert(function(userId, project) {
  var rootDirectoryId = Directories.insert({ name: project.name });
  Projects.update(project, { $set: { rootDirectoryId: rootDirectoryId } });
});

Projects.after.remove(function(userId, project) {
  Directories.remove(project.rootDirectoryId);
});
