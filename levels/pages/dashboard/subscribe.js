if(Meteor.isClient) {
  Meteor.subscribe('projectTrees');
  Meteor.subscribe('userStatus');
}
