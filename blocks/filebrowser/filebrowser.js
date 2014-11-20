if (Meteor.isClient) {
  Template.filebrowser.rendered = function() {
    $('.filebrowser').jstree({
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

    $('.filebrowser').on('activate_node.jstree', function(e, data) {
      var node = data.node;
      if (node.type === 'file') {
        Session.set('currentFile', node.original._id);
      } else {
        Session.set('currentDirectory', node.original._id);
      }
    });

    $('.filebrowser').on('delete_node.jstree', function(e, data) {
      var node = data.node;
      if(node.type === 'file') {
        Files.remove(new Mongo.ObjectID(Session.get('currentFile')));
      } else {
        Directories.remove(new Mongo.ObjectID(Session.get('currentDirectory')));
      }
    });

    $('.filebrowser').on('create_node.jstree', function(e, data) {
      var newNode = data.node;
      var parentReference = $.jstree.reference(data.parent);
      var parentNode = parentReference.get_node(data.parent);

      if(newNode.type === 'file') {
        Files.insert({
          name: newNode.original.text,
          parentId: new Mongo.ObjectID(parentNode.original._id)
        });
      } else {
        Directories.insert({
          name: newNode.original.text,
          parentId: new Mongo.ObjectID(parentNode.original._id)
        });
      }
    });

    $('.filebrowser').on('rename_node.jstree', function(e, data) {
      var node = data.node;
      if(node.type === 'file') {
        Files.update(new Mongo.ObjectID(Session.get('currentFile')), { $set: { name: data.node.text } });
      } else {
        Directories.update(new Mongo.ObjectID(Session.get('currentDirectory')), { $set: { name: data.node.text } });
      }
    });

    var fileNode = function(file) {
      return $.extend({}, file, {
        _id: file._id._str,
        type: 'file',
        text: file.name
      });
    }

    var directoryNode = function(directory) {
      var directories = directory.directories().map(directoryNode);
      var files = directory.files().map(fileNode);
      var children = directories.concat(files);

      return $.extend({}, directory, {
        _id: directory._id._str,
        type: 'folder',
        text: directory.name,
        children: children
      });
    }

    Tracker.autorun(function() {
      var rootDirectory = Directories.findOne();
      if(rootDirectory) {
        $('.filebrowser').jstree(true).settings.core.data = directoryNode(rootDirectory)
        $('.filebrowser').jstree('refresh');
      }
    });
  };
}
