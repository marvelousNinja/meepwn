if(Meteor.isClient) {
  Template.workspace.helpers({
    currentWorkspace: function() {
      if(Meteor.user()) {
        var workspace = Workspaces.findOne({
          userId: Meteor.userId(),
          projectId: Router.current().params._id
        });
        return workspace;
      }
    }
  });
}
