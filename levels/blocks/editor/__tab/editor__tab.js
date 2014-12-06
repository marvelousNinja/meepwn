if(Meteor.isClient) {
  Template.editor__tab.helpers({
    isActive: function() {
      var workspace = Workspaces.findOne({
        _id: Session.workspaceId() }, { fields: { openedFileId: 1 } });

      if(workspace) {
        if(workspace.openedFileId === this._id) {
          return 'editor__tab_active';
        }
      }
    }
  });
}
