if(Meteor.isClient) {
  Template.projectForm.events({
    'submit .project-form': function(e) {
      e.preventDefault();

      var params = {
        name: $(e.target).find('[name=name]').val()
      }

      Meteor.call('createProject', params, function(error, projectId) {
        if(error) Router.current().handleError(error);
        Router.go('projectsShow', { _id: projectId });
      });
    }
  });
}
