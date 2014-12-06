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
    var filteredParams = _.pick(params, 'name', 'parentId', 'projectId');

    var project = Projects.findOne({ _id: filteredParams.projectId });
    if(!project) throw new Meteor.Error(404, 'Project not found');

    var user = Meteor.user();
    if(!Permissions.can(user, 'modify', project)) {
      throw new Meteor.Error(403, 'Not authorized');
    }

    return Directories.insert(filteredParams);
  },
  removeDirectory: function(directoryId) {
    var directory = Directories.findOne({ _id: directoryId });
    if(!directory) throw Meteor.Error(404, 'Directory not found');

    var project = Projects.findOne({ _id: directory.projectId });
    if(!project) throw new Meteor.Error(404, 'Project not found');

    var user = Meteor.user();
    if(!Permissions.can(user, 'modify', project)) {
      throw new Meteor.Error(403, 'Not authorized');
    }

    return Directories.remove({ _id: directory._id });
  },
  renameDirectory: function(directoryId, name) {
    var directory = Directories.findOne({ _id: fileId });
    if(!directory) throw Meteor.Error(404, 'File not found');

    var project = Projects.findOne({ _id: directory.projectId });
    if(!project) throw new Meteor.Error(404, 'Project not found');

    var user = Meteor.user();
    if(!Permissions.can(user, 'modify', project)) {
      throw new Meteor.Error(403, 'Not authorized');
    }

    return Directories.update({ _id: directory._id }, { $set: { name: name } });
  }
});
