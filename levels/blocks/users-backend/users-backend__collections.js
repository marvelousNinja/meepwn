Meteor.users.helpers({
  workspaceFor: function(projectId) {
    var params = { userId: this._id, projectId: projectId };
    var workspace = Workspaces.findOne(params);
    if(!workspace) {
      var id = Workspaces.insert(params);
      workspace = Workspaces.findOne(id);
    }
    return workspace;
  }
});

// Setting up default roles
Meteor.users.after.insert(function(userId, user) {
  Roles.addUsersToRoles(user._id, 'modify', 'projects');
});
