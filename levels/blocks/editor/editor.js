if(Meteor.isClient) {
  Template.editor.helpers({
    fileContext: function() {
      var workspace = Workspaces.findOne({
        userId: Meteor.userId(),
        projectId: Router.current().params._id
      }, { fields: { openedFileId: 1 } });

      if(workspace) {
        return _.extend(this, { fileId: workspace.openedFileId });
      } else {
        return this;
      }
    }
  });
}
