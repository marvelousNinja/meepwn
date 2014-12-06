if(Meteor.isServer) {
  Meteor.publishComposite('projectTrees', {
    find: function() {
      return Meteor.users.find({ _id: this.userId });
    },
    children: [
      {
        find: function(user) {
          return Invitations.find({ userId: user._id });
        }
      },
      {
        find: function(user) {
          return Projects.find({ readPermissionUserIds: user._id });
        },
        children: [
          {
            find: function(project) {
              return Workspaces.find({ projectId: project._id });
            },
            children: [
              {
                find: function(workspace) {
                  return Meteor.users.find({ _id: { $ne: this.userId, $in: [workspace.userId] } });
                }
              }
            ]
          },
          {
            find: function(project) {
              return Directories.find({ projectId: project._id });
            },
          },
          {
            find: function(project) {
              return Files.find({ projectId: project._id });
            }
          }
        ]
      }
    ]
  });
}
