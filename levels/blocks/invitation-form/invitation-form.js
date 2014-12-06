if(Meteor.isClient) {
  Template.invitationForm.events({
    'submit .invitation-form': function(e) {
      e.preventDefault();

      var params = {
        permissions: $(e.target).find('[name=permissions]').val().split('-'),
        projectId: Router.current().params._id
      }

      Meteor.call('createInvitation', params, function(error, invitationId) {
        // TODO: Error handling
        if(error) throw new Error(error);
      });
    }
  });
}
