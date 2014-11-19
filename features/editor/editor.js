if (Meteor.isClient) {
  Session.set('project', '1');

  Template.editor.helpers({
    currentFile: function() {
      return Session.get('currentFile');
    }
  });

  Template.editor.helpers({
    configCM: function() {
      return function(cm) {
        cm.setOption('theme', 'default');
        cm.setOption('lineNumbers', true);
        cm.setOption('lineWrapping', true);
        cm.setOption('smartIndent', true);
        cm.setOption('indentWithTabs', true);
      };
    }
  });
}
