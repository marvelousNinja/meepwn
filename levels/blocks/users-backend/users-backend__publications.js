if(Meteor.isServer) {
  Meteor.publish('userStatus', function() {
    return Meteor.users.find({}, { fields: { 'status' : 1 } });
  });
}
