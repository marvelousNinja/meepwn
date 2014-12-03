if(Meteor.isClient) {
  Template.editor__panel.helpers({
    openedFiles: function() {
      var workspace = Workspaces.findOne({
        userId: Meteor.userId(),
        projectId: Router.current().params._id
      });

      if(workspace) {
        return Files.find({ _id: { $in: workspace.tabbedFileIds } });
      }
    }
  });
}
