if(Meteor.isClient) {
  Notifications = new Mongo.Collection(null);

  Notifications.send = function(type, message) {
    this.insert({ message: message, type: type});
  }

  Notifications.after.insert(function(userId, notification) {
    setTimeout(function() {
      Notifications.remove(notification);
    }, 3500);
  });
}
