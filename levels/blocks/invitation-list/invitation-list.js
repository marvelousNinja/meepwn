if(Meteor.isClient) {
  Template.invitationList.helpers({
    pendingInvitations: function() {
      return Invitations.find({
        projectId: Router.current().params._id
      });
    }
  });
}
