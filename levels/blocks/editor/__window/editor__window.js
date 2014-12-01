if(Meteor.isClient) {
  Template.editor__window.helpers({
    configAce: function() {
      var workspaceId = this.workspaceId;

      return function(editor) {
        editor.getSession().setMode('ace/mode/javascript');
        editor.setShowPrintMargin(false);
        editor.getSession().setUseWrapMode(true);

        editor.selection.on('changeCursor', function() {
          if(editor.focused) {
            var position = editor.selection.getRange();
            Meteor.call('updateCursor', workspaceId, position);
          }
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
    var SelectionRange = require('ace/range').Range;
    var projectId = this.data.projectId;
    var workspaceId = this.data.workspaceId;
    var editor = ace.edit('editor');
    var doc = editor.getSession().getDocument();

    var workspaceCursorIds = {};

    Tracker.autorun(function() {
      var workspaces = Workspaces.find({
        projectId: projectId,
        _id: { $ne: workspaceId },
      }, { fields: { cursorPosition: 1 } }).fetch();

      workspaces.forEach(function(workspace) {
        var selection = workspace.cursorPosition;
        if(workspaceCursorIds[workspace._id]) {
          var prevRange = workspaceCursorIds[workspace._id];
          prevRange.start.detach();
          prevRange.end.detach();
          editor.getSession().removeMarker(prevRange.id);
        }
        // Possible sort needed
        var start = selection.start;
        // This is intended, since it's not quite possible to check for correctess of data
        var end = selection.start;

        // Select or not?
        var cssClass = 'fuko';
        // if(!_.isEqual(start, end)) {
        //   cssClass = 'selection';
        // }

        var range = new SelectionRange(start.row, start.column, end.row, end.column);
        var originalClipRows = range.clipRows;
        range.clipRows = function() {
          var newRange = originalClipRows.apply(this, arguments);
          newRange.isEmpty = function() { return false };
          return newRange;
        }

        range.start = doc.createAnchor(range.start);
        range.end = doc.createAnchor(range.end);
        range.id = editor.getSession().addMarker(range, cssClass, 'text');
        workspaceCursorIds[workspace._id] = range;
      });
    });
  }
}
