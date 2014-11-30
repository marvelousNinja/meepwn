if(Meteor.isClient) {
  Template.workspace.helpers({
    workspaceContext: function() {
      var workspace = Workspaces.findOne({
        userId: Meteor.userId(),
        projectId: this.projectId
      }, { fields: { _id: 1 } });

      if(workspace) {
        return _.extend(this, { workspaceId: workspace._id });
      } else {
        return this;
      }
    }
  });
}
