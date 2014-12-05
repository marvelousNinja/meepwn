if(Meteor.isClient) {
  Template.projectsShow.helpers({
    projectContext: function() {
      return _.extend(this, { projectId: Router.current().params._id });
    }
  });
}
