if(Meteor.isServer) {
  Meteor.publish('workspaces', function() {
    return Workspaces.find();
  });
}
