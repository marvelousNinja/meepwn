if(Meteor.isClient) {
  Template.projectList__permissions.helpers({
    availableActions: function() {
      var project = Projects.findOne({ _id: this._id });
      if(project) {
        if(Permissions.can(Meteor.user(), 'modify', project)) {
          return '[ Read & Modify ]'
        } else {
          return '[ Read ]';
        }
      }
    }
  });
}
