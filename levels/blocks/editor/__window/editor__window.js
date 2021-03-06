if(Meteor.isClient) {
  Template.editor__window.helpers({
    configAce: function() {
      var workspaceId = Session.workspaceId();

      return function(editor) {
        editor.setTheme('ace/theme/clouds_midnight');
        editor.getSession().setMode('ace/mode/javascript');
        editor.setShowPrintMargin(false);
        editor.getSession().setUseWrapMode(true);

        editor.selection.on('changeCursor', function() {
          if(editor.focused) {
            Meteor.call('updateCursor', workspaceId, editor.selection.getCursor());
          }
        });

        editor.selection.on('changeSelection', function() {
          if(editor.focused) {
            Meteor.call('updateSelection', workspaceId, editor.selection.toJSON());
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

        editor.setReadOnly(true);
      };
    }
  });

  Template.editor__window.rendered = function() {
    var self = this;

    var Selection = require('ace/selection').Selection;
    var Range = require('ace/range').Range;

    var workspaceSelectionIds = {};
    var workspaceCursorIds = {};

    Tracker.autorun(function() {
      var editor = ace.edit('editor');
      var session = editor.getSession();
      var projectId = Session.projectId();
      var workspaceId = Session.workspaceId();

      var workspaces = Workspaces.find({
        projectId: projectId,
        _id: { $ne: workspaceId },
      }, { fields: { selection: 1, cursor: 1 , userId: 1 } });

      var selection = new Selection(session);

      workspaces.forEach(function(workspace) {
        if (workspace.selection) {
          var previousMarkerId = workspaceSelectionIds[workspace._id];
          if(previousMarkerId) editor.getSession().removeMarker(previousMarkerId);

          selection.fromJSON(workspace.selection);

          var klass = 'editor__selection ' + 'user_' + workspace.userId;
          var range = selection.getRange();
          var id = editor.getSession().addMarker(range, klass, 'line');
          workspaceSelectionIds[workspace._id] = id;
        }

        if(workspace.cursor) {
          var previousMarkerId = workspaceCursorIds[workspace._id];
          if(previousMarkerId) editor.getSession().removeMarker(previousMarkerId);

          // create cursor here
          var range = Range.fromPoints(workspace.cursor, workspace.cursor);

          // monkey patch it here
          var origClipRows = range.clipRows;
          range.clipRows = function() {
            var result = origClipRows.apply(this, arguments);
            result.isEmpty = function() { return false };
            return result;
          }

          var klass = 'editor__selection ' + 'user_' + workspace.userId;
          var id = editor.getSession().addMarker(range, klass, 'text');
          workspaceCursorIds[workspace._id] = id;
        }
      });
    });
  }
}
