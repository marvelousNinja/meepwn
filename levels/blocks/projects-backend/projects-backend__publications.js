if(Meteor.isServer) {
  Meteor.publish('projects', function() {
    return Projects.find();
  });
}
