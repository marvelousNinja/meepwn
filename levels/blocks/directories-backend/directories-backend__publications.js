if(Meteor.isServer) {
  Meteor.publish('directories', function() {
    return Directories.find();
  });
}
