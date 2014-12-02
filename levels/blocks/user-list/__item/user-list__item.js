if(Meteor.isClient) {
  Template.userList__item.helpers({
    userName: function() {
      return this.profile.name;
    }
  });
}
