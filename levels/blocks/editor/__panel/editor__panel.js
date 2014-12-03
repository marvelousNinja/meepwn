if(Meteor.isClient) {
  Template.editor__panel.helpers({
    fileName: function() {
      var file = Files.findOne(this.fileId);
      if(file) return file.name;
    }
  });
}
