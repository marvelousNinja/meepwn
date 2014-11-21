if(Meteor.isClient) {
  Template.editor__window.helpers({
    configAce: function() {
      return function(editor) {
        editor.getSession().setMode('ace/mode/javascript');
        editor.setShowPrintMargin(false);
        editor.getSession().setUseWrapMode(true);
      };
    }
  });
}
