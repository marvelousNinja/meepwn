if(Meteor.isClient) {
  Template.editor__window.helpers({
    configAce: function() {
      var workspaceId = this.workspaceId;

      return function(editor) {
        editor.getSession().setMode('ace/mode/javascript');
        editor.setShowPrintMargin(false);
        editor.getSession().setUseWrapMode(true);

        editor.on('changeSelection', function() {
          var position = editor.getCursorPosition();
          Meteor.call('updateCursor', workspaceId, position);
        });
      };
    }
  });
}
