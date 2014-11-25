Meteor.methods({
  createProject: function(project) {
    var projectId = Projects.insert(project);
    return projectId;
  },
  deleteProject: function(project) {
    Projects.remove(project);
  }
});
