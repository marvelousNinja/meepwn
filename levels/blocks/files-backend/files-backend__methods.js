Meteor.methods({
  openFile: function(projectId, fileId) {
    var params = { userId: Meteor.userId(), projectId: projectId };
    var workspace = Workspaces.findOne(params);
    if(!workspace) {
      var id = Workspaces.insert(params);
      workspace = Workspaces.findOne(id);
    }

    return Workspaces.update(workspace._id, { $set: { openedFileId: fileId } });
  },
  createFile: function(params) {
    return Files.insert(params);
  },
  removeFile: function(fileId) {
    return Files.remove(fileId);
  },
  renameFile: function(fileId, name) {
    return Files.update(fileId, { $set: { name: name } });
  }
});
