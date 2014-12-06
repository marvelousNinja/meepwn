if(Meteor.isClient) {
  Template.projectList.helpers({
    availableProjects: function() {
      return Projects.find();
    }
  });

  Template.projectList.events({
    'click .project-list__delete': function(e) {
      Meteor.call('deleteProject', this._id, function(error) {
        if(error) Router.current().handleError(error);
      });
    }
  });
}
