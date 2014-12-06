if(Meteor.isClient) {
  Template.projectList__delete.events({
    'click .project-list__delete': function(e) {
      Meteor.call('deleteProject', this._id, function(error) {
        if(error) Router.current().handleError(error);
      });
    }
  });
}
