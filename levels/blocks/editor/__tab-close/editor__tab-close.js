if(Meteor.isClient) {
  Template.editor__tabClose.events({
    'click .editor__tab-close': function(e) {
      Meteor.call('closeFile', Session.projectId(), this._id, function() {
        var workspace = Workspaces.findOne({
          _id: Session.workspaceId()
        }, { fields: { tabbedFileIds: 1 } });

        if(workspace) {
          Meteor.call('openFile', Session.projectId(), workspace.tabbedFileIds[0]);
        }
      });
    }
  });
}
