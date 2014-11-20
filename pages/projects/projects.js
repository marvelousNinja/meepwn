this.Projects = new Meteor.Collection('projects', { idGeneration: 'MONGO' });

Projects.helpers({
  rootDirectory: function() {
    Directories.findOne({
      parentId: null,
      projectId: this._id
    })
  }
});
