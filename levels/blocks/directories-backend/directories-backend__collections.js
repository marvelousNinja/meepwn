this.Directories = new Meteor.Collection('directories');

Directories.helpers({
  files: function() {
    return Files.find({
      parentId: this._id
    })
  },

  directories: function() {
    return Directories.find({
      parentId: this._id
    })
  }
});

Directories.after.remove(function(userId, directory) {
  Files.remove({parentId: directory._id});
  Directories.remove({parentId: directory._id});
});
