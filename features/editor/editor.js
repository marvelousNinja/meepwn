if (Meteor.isClient) {
  Session.set('project', '1');

  Template.editor.helpers({
    currentFile: function() {
      return Session.get('currentFile');
    }
  });

  Template.editor.helpers({
    configAce: function() {
      return function(editor) {
        editor.getSession().setMode('ace/mode/javascript');
        editor.setShowPrintMargin(false);
        editor.getSession().setUseWrapMode(true);
      };
    }
  });
}
