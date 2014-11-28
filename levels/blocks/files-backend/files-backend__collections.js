this.Files = new Meteor.Collection('files');

Files.before.insert(function(userId, file) {
  file.ancestorIds = Ancestry.calculateIds(file.parentId, Directories);
});
