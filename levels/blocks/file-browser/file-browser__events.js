var methodName = function(node, action) {
  var type = node.type;
  if(type === 'root') type = 'directory';
  var uppercaseType = type.charAt(0).toUpperCase() + type.slice(1);
  return action + uppercaseType;
}

this.FileBrowser__events = {
  setup: function() {
    $('.file-browser').on('activate_node.jstree', function(e, data) {
      var node = data.node;
      Meteor.call(methodName(node, 'open'), Session.get('projectId'), node.original.id);
    });

    $('.file-browser').on('delete_node.jstree', function(e, data) {
      var self = this;
      var node = data.node;
      Meteor.call(methodName(node, 'remove'), node.original.id, function(error) {
        if(error) Router.current().handleError(error);
        $(self).jstree('refresh');
      });
    });

    $('.file-browser').on('rename_node.jstree', function(e, data) {
      var self = this;
      var node = data.node;
      Meteor.call(methodName(node, 'rename'), node.original.id, data.node.text, function(error) {
        if(error) Router.current().handleError(error);
        $(self).jstree('refresh');
        $(self).jstree(true).select_node(node.original.id);
      });
    });

    $('.file-browser').on('create_node.jstree', function(e, data) {
      var self = this;
      var newNode = data.node;
      var parentReference = $.jstree.reference(data.parent);
      var parentNode = parentReference.get_node(data.parent);

      Meteor.call(methodName(newNode, 'create'), {
        name: newNode.original.text,
        parentId: parentNode.original.id,
        projectId: Session.get('projectId')
      }, function(error) {
        if(error) Router.current().handleError(error);
        $(self).jstree('refresh');
        //TODO: Hook for renaming
      });
    });
  }
}
