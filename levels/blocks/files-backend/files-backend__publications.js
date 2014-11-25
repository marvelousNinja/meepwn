if(Meteor.isServer) {
  Meteor.publish('files', function() {
    return Files.find();
  });
}
