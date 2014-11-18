if (Meteor.isClient) {
  Template.tree.rendered = function() {
    $('.tree').jstree({
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
                inst.create_node(obj, { type : 'default' }, 'last', function (new_node) {
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
        'default' : { 'icon' : 'jstree-folder' },
        'file' : { 'valid_children' : [], 'icon' : 'jstree-file' }
      },
      'unique' : {
        'duplicate' : function (name, counter) {
          return name + ' ' + counter;
        }
      },
    });

    $('.tree').on('activate_node.jstree', function(e, data) {
      Session.set('document', data.node.original._id);
    });

    $('.tree').on('delete_node.jstree', function(e, data) {
      Documents.remove(Session.get('document'));
    });

    $('.tree').on('create_node.jstree', function(e, data) {
      var node = data.node;
      if(node.type === 'file') {
        Documents.insert({
          title: data.node.original.text,
        });
      } else {
        Directories.insert({
          title: data.node.original.text
        });
      }
    });

    $('.tree').on('rename_node.jstree', function(e, data) {
      Documents.update(Session.get('document'), { title: data.node.text });
    });

    Tracker.autorun(function() {
      var documents = Documents.find().map(function(doc) {
        doc.text = doc.title;
        doc.type = 'file';
        return doc;
      });

      $('.tree').jstree(true).settings.core.data = {
        text: 'SampleProject',
        type: 'root',
        children: documents
      };

      $('.tree').jstree('refresh');
    });
  };
}
