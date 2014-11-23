// Projects
this.Projects = new Meteor.Collection('projects');
if(Meteor.isServer) {
  Meteor.publish('projects', function() {
    return Projects.find();
  });
}

Projects.helpers({
  rootDirectory: function() {
    return Directories.findOne(this.rootDirectoryId);
  }
});

Projects.after.insert(function(userId, project) {
  var rootDirectoryId = Directories.insert({ name: project.name });
  Projects.update(project, { $set: { rootDirectoryId: rootDirectoryId } });
});

Projects.after.remove(function(userId, project) {
  Directories.remove(project.rootDirectoryId);
});

Meteor.methods({
  createProject: function(project) {
    var projectId = Projects.insert(project);
    return projectId;
  },
  deleteProject: function(project) {
    Projects.remove(project);
  }
});

// Directories
this.Directories = new Meteor.Collection('directories');
if(Meteor.isServer) {
  Meteor.publish('directories', function() {
    return Directories.find();
  });
}

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

// Files
this.Files = new Meteor.Collection('files');
if(Meteor.isServer) {
  Meteor.publish('files', function() {
    return Files.find();
  });
}

// Users
if(Meteor.isServer) {
  Meteor.publish('userStatus', function() {
    return Meteor.users.find({}, { fields: {'status' : 1 } });
  });
}
