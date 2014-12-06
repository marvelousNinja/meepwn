if(Meteor.isClient) {
  Template.projectList.helpers({
    availableProjects: function() {
      return Projects.find();
    }
  });
}
