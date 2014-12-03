if(Meteor.isClient) {
  Template.editor__tabClose.events({
    'click .editor__tab-close': function(e) {
      Meteor.call('closeFile', Router.current().params._id, this._id, function() {
        var workspace = Workspaces.findOne({
          userId: Meteor.userId(),
          projectId: Router.current().params._id
        });

        if(workspace) {
          Meteor.call('openFile', Router.current().params._id, workspace.tabbedFileIds[0]);
        }
      });
    }
  });
}
