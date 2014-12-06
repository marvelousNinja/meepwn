var fileNode = function(file) {
  return {
    id: file._id,
    type: 'file',
    text: file.name,
    parent: file.parentId
  };
}

var directoryNode = function(directory) {
  return {
    id: directory._id,
    type: directory.parentId ? 'directory' : 'root',
    text: directory.name,
    parent: directory.parentId ? directory.parentId : '#'
  };
}

this.FileBrowser__refresher = {
  autotrack: function() {
    Tracker.autorun(function() {
      var projectId = Session.get('projectId');
      var directories = Directories.find({ projectId: projectId }).map(directoryNode);
      var files = Files.find({ projectId: projectId }).map(fileNode);

      $('.file-browser').jstree(true).settings.core.data = directories.concat(files);
      $('.file-browser').jstree('refresh');
    });
  }
}
