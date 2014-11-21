if(Meteor.isClient) {
  Template.projectForm.events({
    'submit .project-form': function(e) {
      e.preventDefault();

      var params = {
        name: $(e.target).find('[name=name]').val()
      }

      Meteor.call('createProject', params, function(error, projectId) {
        // TODO: Error handling
        if(error) throw new Error(error);

        Router.go('project', { _id: projectId._str });
      });
    }
  });
}
