if(Meteor.isClient) {
  Template.editor__window.helpers({
    configAce: function() {
      var workspaceId = this.workspaceId;

      return function(editor) {
        editor.getSession().setMode('ace/mode/javascript');
        editor.setShowPrintMargin(false);
        editor.getSession().setUseWrapMode(true);

        editor.selection.on('changeSelection', function() {
          if(editor.focused) {
            Meteor.call('updateCursor', workspaceId, editor.selection.toJSON());
          }
        });

        editor.on('change', function() {
          editor.resize(true);
        });

        editor.on('focus', function() {
          editor.focused = true;
        });

        editor.on('blur', function() {
          editor.focused = false;
        });
      };
    }
  });

  Template.editor__window.rendered = function() {
    var self = this;
    var Selection = require('ace/selection').Selection;

    var editor = ace.edit('editor');
    var session = editor.getSession();
    var workspaceMarkerIds = {};

    window.markers = workspaceMarkerIds;

    Tracker.autorun(function() {
      var projectId = self.data.projectId;
      var workspaceId = self.data.workspaceId;

      var workspaces = Workspaces.find({
        projectId: projectId,
        _id: { $ne: workspaceId },
      }, { fields: { cursorPosition: 1 } });

      var selection = new Selection(session);

      workspaces.forEach(function(workspace) {
        if (workspace.cursorPosition) {

          var previousMarkerId = workspaceMarkerIds[workspace._id];
          if(previousMarkerId) editor.getSession().removeMarker(previousMarkerId);

          selection.fromJSON(workspace.cursorPosition);

          var range = selection.getRange();
          // range.$isEmpty = false;
          // range.isEmpty = function() { return false };
          // range.clipRows = function() { return this };

          var id = editor.getSession().addMarker(range, 'editor__selection', 'line');
          workspaceMarkerIds[workspace._id] = id;
        }
      });
    });
  }
}
