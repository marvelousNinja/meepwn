if(Meteor.isClient) {
  Template.editor__tab.helpers({
    isActive: function() {
      var workspace = Workspaces.findOne({
        userId: Meteor.userId(),
        projectId: Router.current().params._id
      });

      if(workspace) {
        if(workspace.openedFileId === this._id) {
          return 'editor__tab_active';
        }
      }
    }
  });
}
