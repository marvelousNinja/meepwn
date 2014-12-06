Meteor.methods({
  createInvitation: function(params) {
    var filteredParams = _.pick(params, 'projectId', 'permissions');

    var project = Projects.findOne({ _id: filteredParams.projectId });
    if(!project) throw new Meteor.Error(404, 'Project not found');

    var user = Meteor.user();
    if(!Permissions.can(user, 'invite', project)) {
      throw new Meteor.Error(403, 'Not authorized');
    }
    filteredParams.userId = Meteor.userId();

    return Invitations.insert(filteredParams);
  },
  acceptInvitation: function(invitationId) {
    var user = Meteor.user();
    if(!user) throw new Meteor.Error(403, 'Not authorized');

    var invitation = Invitations.findOne({ _id: invitationId });
    if(!invitation) throw new Meteor.Error(404, 'Invitation not found');

    var project = Projects.findOne({ _id: invitation.projectId });
    if(!project) throw new Meteor.Error(404, 'Project not found');

    Permissions.grant(user, invitation.permissions, project);
    Projects.update({ _id: project._id }, { $pushAll: {
      readPermissionUserIds: project.readPermissionUserIds,
      modifyPermissionUserIds: project.modifyPermissionUserIds
    }});

    Invitations.remove({ _id: invitation._id });
    return invitation.projectId;
  },
  deleteInvitation: function(invitationId) {
    var user = Meteor.user();
    if(!user) throw new Meteor.Error(403, 'Not authorized');

    var invitation = Invitations.findOne({ _id: invitationId });
    if(!invitation) throw new Meteor.Error(404, 'Invitation not found');

    var project = Projects.findOne({ _id: invitation.projectId });
    if(!project) throw new Meteor.Error(404, 'Project not found');

    if(!Permissions.can(user, 'invite', project)) {
      throw new Meteor.Error(403, 'Not authorized');
    }

    Invitations.remove({ _id: invitation._id });
    return invitation.projectId;
  }
});
