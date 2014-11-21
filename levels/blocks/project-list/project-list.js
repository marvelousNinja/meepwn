if(Meteor.isClient) {
  Template.projectList.helpers({
    availableProjects: function() {
      return Projects.find();
    }
  });

  Template.projectList.events({
    'click .project-list__delete': function(e) {
      Meteor.call('deleteProject', this, function(error) {
        // TODO: Error handling
        if(error) throw new Error(error);
      });
    }
  });
}
