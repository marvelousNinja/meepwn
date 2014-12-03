if(Meteor.isClient) {
  Template.registerHelper('currentProject', function() {
    if(Router.current().route.getName() === 'project') {
      return Projects.findOne({ _id: Router.current().params._id });
    }
  });
}
