if(Meteor.isClient) {
  Template.registerHelper('currentProject', function() {
    if(Router.current().route.getName() === 'projectsShow') {
      return Projects.findOne({ _id: Router.current().params._id });
    }
  });
}
