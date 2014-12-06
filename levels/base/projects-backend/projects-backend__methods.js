Meteor.methods({
  createProject: function(params) {
    var user = Meteor.user();
    if(!user) throw new Meteor.Error(403, 'Not authorized');

    var filteredParams = _.pick(params, 'name');

    Permissions.grant(user, ['read', 'modify', 'invite'], filteredParams);

    return Projects.insert(filteredParams);
  },
  deleteProject: function(projectId) {
    var project = Projects.findOne({ _id: projectId });
    if(!project) throw new Meteor.Error(404, 'Project not found');

    var user = Meteor.user();
    if(!Permissions.can(user, 'modify', project)) {
      throw new Meteor.Error(403, 'Not authorized');
    }

    Projects.remove({ _id: project._id });
  }
});
