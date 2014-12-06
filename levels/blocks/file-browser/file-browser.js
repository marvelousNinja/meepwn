if (Meteor.isClient) {
  var createFolder = function (data) {
    var inst = $.jstree.reference(data.reference);
    var obj = inst.get_node(data.reference);
    inst.create_node(obj, { type : 'directory' }, 'last');
  }

  var createFile = function (data) {
    var inst = $.jstree.reference(data.reference);
    var obj = inst.get_node(data.reference);
    inst.create_node(obj, { type : 'file' }, 'last');
  }

  Template.fileBrowser.rendered = function() {
    $('.file-browser').jstree({
      core: {
        animation: 0,
        check_callback: true,
        data: [],
        themes: {
          name: 'default-dark'
        }
      },
      plugins: [ 'themes', 'contextmenu', 'dnd', 'search', 'state', 'types', 'wholerow' ],
      contextmenu: {
        'items' : function(node) {
          var menuItems = $.jstree.defaults.contextmenu.items();
          delete menuItems.create.action;
          delete menuItems.ccp;

          menuItems.create.label = 'Create';
          menuItems.create.submenu = {
            createFolder: { label: 'Folder', action: createFolder },
            createFile: { label: 'File', action: createFile }
          };
          if(this.get_type(node) === 'file') delete menuItems.create;
          if(this.get_type(node) === 'root') delete menuItems.remove;
          return menuItems;
        }
      },
      types : {
        root : { icon: 'jstree-folder' },
        directory : { icon : 'jstree-folder' },
        file : { valid_children : [], icon : 'jstree-file' }
      },
      unique : {
        duplicate : function (name, counter) {
          return name + ' ' + counter;
        }
      },
    });

    FileBrowser__events.setup();
    FileBrowser__refresher.autotrack();
  };
}
