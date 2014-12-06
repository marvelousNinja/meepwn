if(Meteor.isClient) {
  Template.invitationList__revoke.events({
    'click .invitation-list__revoke': function() {
      return Meteor.call('deleteInvitation', this._id, function(error) {
        if(error) Router.current().handleError(error);
      });
    }
  });
}
