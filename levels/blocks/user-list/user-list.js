if(Meteor.isClient) {
  Template.userList.helpers({
    onlineUsers: function() {
      var projectId = Router.current().params._id;
      // TODO: Implement filters for 'active' workspaces...
      var userIds = Workspaces.find({ projectId: projectId }).map(function(workspace) {
        return workspace.userId;
      });
      return Meteor.users.find({ _id: { $in: userIds }, 'status.online': true });
    }
  });
}
