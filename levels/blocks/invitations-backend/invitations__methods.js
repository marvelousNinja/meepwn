Meteor.methods({
  createInvitation: function(params) {
    // Authorization
    var user = Meteor.user();
    var projectId = params.projectId;

    if(!Roles.userIsInRole(user, 'invite-' + projectId, 'projects')) {
      throw new Meteor.Error(403, 'Not Authorized');
    }

    // Method 'meat'
    var permissions = [];
    if(params.permissions === 'read-modify') {
      permissions.push('modify-' + projectId);
    }
    permissions.push('read-' + projectId);

    var invitationId = Invitations.insert({
      userId: Meteor.userId(),
      projectId: projectId,
      roles: { projects: permissions }
    });
    return invitationId;
  }
  // deleteProject: function(project) {
  //   // Authorization
  //   var user = Meteor.user();
  //   if(!Roles.userIsInRole(user, 'modify-' + project._id, 'projects')) {
  //     throw new Meteor.Error(403, 'Not Authorized');
  //   }

  //   // Method 'meat'
  //   Projects.remove(project._id);
  // }
});
