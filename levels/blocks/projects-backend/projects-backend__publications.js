if(Meteor.isServer) {
  Meteor.publishComposite('projectTrees', {
    find: function() {
      return Meteor.users.find({ _id: this.userId });
    },
    children: [
      {
        find: function(user) {
          var projectIds = user.roles.projects.filter(function(role) {
            return role.indexOf('read-') === 0;
          }).map(function(role) {
            return role.split('-')[1];
          });

          // TODO: Publishing all for now, until I'll implement invitation mechanism
          return Projects.find();//{ _id: { $in: projectIds } });
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
              return Directories.find({ _id: project.rootDirectoryId });
            },
            children: [
              {
                find: function(rootDirectory) {
                  return Directories.find({ ancestorIds: rootDirectory._id });
                }
              },
              {
                find: function(rootDirectory) {
                  return Files.find({ ancestorIds: rootDirectory._id });
                }
              }
            ]
          }
        ]
      }
    ]
  });
}
