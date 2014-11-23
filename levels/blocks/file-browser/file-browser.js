if (Meteor.isClient) {
  Template.fileBrowser.rendered = function() {
    $('.file-browser').jstree({
      core: {
        animation: 0,
        check_callback: true,
        data: []
      },
      plugins: [ 'contextmenu', 'dnd', 'search', 'state', 'types', 'wholerow' ],
      contextmenu: {
        'items' : function(node) {
          var tmp = $.jstree.defaults.contextmenu.items();
          delete tmp.create.action;
          // Cut, Copy, Paste
          delete tmp.ccp;
          tmp.create.label = 'Create';
          tmp.create.submenu = {
            create_folder: {
              separator_after: true,
              label: 'Folder',
              action: function (data) {
                var inst = $.jstree.reference(data.reference);
                var obj = inst.get_node(data.reference);
                inst.create_node(obj, { type : 'directory' }, 'last', function (new_node) {
                  setTimeout(function () { inst.edit(new_node); },0);
                });
              }
            },
            create_file: {
              label: 'File',
              action: function (data) {
                var inst = $.jstree.reference(data.reference);
                var obj = inst.get_node(data.reference);
                inst.create_node(obj, { type : 'file'}, 'last', function (new_node) {
                  setTimeout(function () { inst.edit(new_node); },0);
                });
              }
            }
          };
          if(this.get_type(node) === 'file') {
            delete tmp.create;
          }

          if(this.get_type(node) === 'root') {
            delete tmp.remove;
          }
          return tmp;
        }
      },
      'types' : {
        'root' : { 'icon': 'jstree-folder' },
        'directory' : { 'icon' : 'jstree-folder' },
        'file' : { 'valid_children' : [], 'icon' : 'jstree-file' }
      },
      'unique' : {
        'duplicate' : function (name, counter) {
          return name + ' ' + counter;
        }
      },
    });

    $('.file-browser').on('activate_node.jstree', function(e, data) {
      var node = data.node;
      if (node.type === 'file') {
        var file = Files.findOne(node.original.id);
        Session.set('currentFileId', file._id);
      } else {
        var directory = Directories.findOne(node.original.id);
        Session.set('currentDirectoryId', directory._id);
      }
    });

    $('.file-browser').on('delete_node.jstree', function(e, data) {
      var node = data.node;
      if(node.type === 'file') {
        Files.remove(Session.get('currentFileId'));
      } else {
        Directories.remove(Session.get('currentDirectoryId'));
      }
    });

    $('.file-browser').on('create_node.jstree', function(e, data) {
      var newNode = data.node;
      var parentReference = $.jstree.reference(data.parent);
      var parentNode = parentReference.get_node(data.parent);

      if(newNode.type === 'file') {
        Files.insert({
          name: newNode.original.text,
          parentId: Session.get('currentDirectoryId')
        });
      } else {
        Directories.insert({
          name: newNode.original.text,
          parentId: Session.get('currentDirectoryId')
        });
      }
    });

    $('.file-browser').on('rename_node.jstree', function(e, data) {
      var node = data.node;
      if(node.type === 'file') {
        Files.update(Session.get('currentFileId'), { $set: { name: data.node.text } });
      } else {
        Directories.update(Session.get('currentDirectoryId'), { $set: { name: data.node.text } });
      }
    });

    var fileNode = function(file) {
      return {
        id: file._id,
        type: 'file',
        text: file.name
      };
    }

    var directoryNode = function(directory) {
      var directories = directory.directories().map(directoryNode);
      var files = directory.files().map(fileNode);
      var children = directories.concat(files);

      return {
        id: directory._id,
        type: 'folder',
        text: directory.name,
        children: children
      };
    }

    Tracker.autorun(function() {
      var currentProject = Projects.findOne(Router.current().params._id);
      if(currentProject) {
        var rootDirectory = currentProject.rootDirectory();
        $('.file-browser').jstree(true).settings.core.data = directoryNode(rootDirectory);
        $('.file-browser').jstree('refresh');
      }
    });
  };
}
