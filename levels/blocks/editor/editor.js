if (Meteor.isClient) {
  Template.editor.helpers({
    currentFile: function() {
      return Files.findOne(Session.get('currentFileId'));
    }
  });
}
