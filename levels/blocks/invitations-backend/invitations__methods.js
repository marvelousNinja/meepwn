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
  },
  acceptInvitation: function(params) {
    if(!this.isSimulation) {
      // Authorization
      var userId = Meteor.userId();
      if(!userId) throw new Meteor.Error(403, 'Not Authorized');

      // Method 'meat'
      var invitation = Invitations.findOne({ _id: params.invitationId });
      if(invitation) {
        for(resource in invitation.roles) {
          Roles.addUsersToRoles(userId, invitation.roles[resource], resource);
        }
        Invitations.remove(invitation);
        return invitation.projectId;
      } else {
        throw new Meteor.Error(404, 'Invitation not found');
      }
    }
  }
});
