if(Meteor.isClient) {
  Template.editor.helpers({
    currentFile: function() {
      if(Meteor.user()) {
        var workspace = Workspaces.findOne({
          userId: Meteor.userId(),
          projectId: Router.current().params._id
        });

        if(workspace) {
          return Files.findOne(workspace.openedFileId);
        }
      }
    }
  });
}
