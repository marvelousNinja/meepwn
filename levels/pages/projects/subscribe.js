if(Meteor.isClient) {
  Meteor.subscribe('projects');
  Meteor.subscribe('directories');
  Meteor.subscribe('files');
  Meteor.subscribe('userStatus');
  Meteor.subscribe('workspaces');
}
