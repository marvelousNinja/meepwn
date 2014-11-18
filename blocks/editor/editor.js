if (Meteor.isClient) {
  Template.editor.helpers({
    docid: function() {
      return Session.get('document');
    }
  });

  Template.editor.helpers({
    configCM: function() {
      return function(cm) {
        cm.setOption('theme', 'default');
        cm.setOption('lineNumbers', true);
        cm.setOption('lineWrapping', true);
        cm.setOption('smartIndent', true);
        return cm.setOption('indentWithTabs', true);
      };
    }
  });
}
