if(Meteor.isClient) {
  Template.invitationList__permissions.helpers({
    permissions: function() {
      return _.include(this.permissions, 'modify') ? '[ Read & Modify ]' : '[ Read ]'
    }
  });
}
