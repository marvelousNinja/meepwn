if(Meteor.isClient) {
  Template.project.helpers({
    projectContext: function() {
      return _.extend(this, { projectId: Router.current().params._id });
    }
  });
}
