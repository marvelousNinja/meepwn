this.Projects = new Meteor.Collection('projects', { idGeneration: 'MONGO' });

Projects.helpers({
  rootDirectory: function() {
    return Directories.findOne(this.rootDirectoryId);
  }
});

Meteor.methods({
  createProject: function(project) {
    var projectId = Projects.insert(project);
    var rootDirectoryId = Directories.insert({ name: project.name });
    Projects.update(projectId, { $set: { rootDirectoryId: rootDirectoryId } });
    return projectId;
  },

  deleteProject: function(project) {
    Projects.remove(project);
  }
});
