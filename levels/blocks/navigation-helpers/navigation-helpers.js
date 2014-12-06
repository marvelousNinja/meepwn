if(Meteor.isClient) {
  Template.registerHelper('projectId', function() {
    return Session.projectId();
  });

  Template.registerHelper('workspaceId', function() {
    return Session.workspaceId();
  });

  Template.registerHelper('fileId', function() {
    return Session.fileId();
  });

  Template.registerHelper('directoryId', function() {
    return Session.directoryId();
  });
}
