Meteor.methods({
  openDirectory: function(projectId, directoryId) {
    var params = { userId: Meteor.userId(), projectId: projectId };
    var workspace = Workspaces.findOne(params);
    if(!workspace) {
      var id = Workspaces.insert(params);
      workspace = Workspaces.findOne(id);
    }

    return Workspaces.update(workspace._id, { $set: { openedDirectoryId: directoryId } });
  },
  createDirectory: function(params) {
    return Directories.insert(params);
  },
  removeDirectory: function(directoryId) {
    return Directories.remove(directoryId);
  },
  renameDirectory: function(directoryId, name) {
    return Directories.update(directoryId, { $set: { name: name } });
  }
});
