Meteor.methods({
  openFile: function(projectId, fileId) {
    var params = { userId: Meteor.userId(), projectId: projectId };
    var workspace = Workspaces.findOne(params);
    if(!workspace) {
      var id = Workspaces.insert(params);
      workspace = Workspaces.findOne(id);
    }

    // TODO: Do not insert duplicates
    return Workspaces.update(workspace._id, {
      $set: { openedFileId: fileId },
      $push: { tabbedFileIds: fileId }
    });
  },
  closeFile: function(projectId, fileId) {
    var params = { userId: Meteor.userId(), projectId: projectId };
    var workspace = Workspaces.findOne(params);
    if(!workspace) {
      var id = Workspaces.insert(params);
      workspace = Workspaces.findOne(id);
    }

    return Workspaces.update(workspace._id, {
      $unset: { openedFileId: '' },
      $pull: { tabbedFileIds: fileId }
    });
  },
  createFile: function(params) {
    var filteredParams = _.pick(params, 'name', 'parentId', 'projectId');

    var project = Projects.findOne({ _id: filteredParams.projectId });
    if(!project) throw new Meteor.Error(404, 'Project not found');

    var user = Meteor.user();
    if(!Permissions.can(user, 'modify', project)) {
      throw new Meteor.Error(403, 'Not authorized');
    }

    return Files.insert(filteredParams);
  },
  removeFile: function(fileId) {
    var file = Files.findOne({ _id: fileId });
    if(!file) throw Meteor.Error(404, 'File not found');

    var project = Projects.findOne({ _id: file.projectId });
    if(!project) throw new Meteor.Error(404, 'Project not found');

    var user = Meteor.user();
    if(!Permissions.can(user, 'modify', project)) {
      throw new Meteor.Error(403, 'Not authorized');
    }

    return Files.remove({ _id: file._id });
  },
  renameFile: function(fileId, name) {
    var file = Files.findOne({ _id: fileId });
    if(!file) throw Meteor.Error(404, 'File not found');

    var project = Projects.findOne({ _id: file.projectId });
    if(!project) throw new Meteor.Error(404, 'Project not found');

    var user = Meteor.user();
    if(!Permissions.can(user, 'modify', project)) {
      throw new Meteor.Error(403, 'Not authorized');
    }

    return Files.update({ _id: file._id }, { $set: { name: name } });
  }
});
