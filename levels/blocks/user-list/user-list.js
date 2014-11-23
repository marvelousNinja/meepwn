if(Meteor.isClient) {
  Template.userList.helpers({
    onlineUsers: function() {
      return Meteor.users.find({'status.online': true});
    }
  });
}
