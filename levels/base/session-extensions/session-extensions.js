if(Meteor.isClient) {
  Session.projectId = function() {
    return Session.get('projectId');
  }

  Session.workspaceId = function() {
    var workspace = Workspaces.findOne({
      userId: Meteor.userId(),
      projectId: this.projectId()
    }, { fields: { _id: 1 } });
    if(workspace) return workspace._id;
  }

  Session.fileId = function() {
    var workspace = Workspaces.findOne({
      _id: this.workspaceId() }, { fields: { openedFileId: 1 } });
    var file = Files.findOne({ _id: workspace.openedFileId });
    if(file) return file._id;
  }
}
