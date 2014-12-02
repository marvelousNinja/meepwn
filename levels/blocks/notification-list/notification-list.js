if(Meteor.isClient) {
  Template.notificationList.helpers({
    notifications: function() {
      return Notifications.find();
    }
  });
}
