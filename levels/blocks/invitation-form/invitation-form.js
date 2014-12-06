if(Meteor.isClient) {
  Template.invitationForm.events({
    'submit .invitation-form': function(e) {
      e.preventDefault();

      var params = {
        permissions: $(e.target).find('[name=permissions]:checked').val().split('-'),
        projectId: Router.current().params._id
      }

      console.log(params);

      Meteor.call('createInvitation', params, function(error, invitationId) {
        if(error) Router.current().handleError(error);
      });
    }
  });
}
