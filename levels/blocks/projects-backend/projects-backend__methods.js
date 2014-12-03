Meteor.methods({
  createProject: function(project) {
    // Authorization
    var user = Meteor.user();
    if(!Roles.userIsInRole(user, 'modify', 'projects')) {
      throw new Meteor.Error(403, 'Not Authorized');
    }

    // Method 'meat'
    var projectId = Projects.insert(project);
    //return projectId;

    // Setting up authorization for future calls
    Roles.addUsersToRoles(user._id, 'modify-' + projectId, 'projects');
    Roles.addUsersToRoles(user._id, 'read-' + projectId, 'projects');
    Roles.addUsersToRoles(user._id, 'invite-' + projectId, 'projects');
    return projectId;
  },
  deleteProject: function(project) {
    // Authorization
    var user = Meteor.user();
    if(!Roles.userIsInRole(user, 'modify-' + project._id, 'projects')) {
      throw new Meteor.Error(403, 'Not Authorized');
    }

    // Method 'meat'
    Projects.remove(project._id);
  }
});
