if(Meteor.isClient) {
  Template.editor__panel.helpers({
    openedFiles: function() {
      var workspace = Workspaces.findOne({
       _id: Session.workspaceId() }, { fields: { tabbedFileIds: 1 } });
      return Files.find({ _id: { $in: workspace.tabbedFileIds } });
    }
  });
}
