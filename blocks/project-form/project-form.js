if(Meteor.isClient) {
  Template.projectForm.events({
    'submit .project-form': function(e) {
      e.preventDefault();

      var project = {
        name: $(e.target).find('[name=name]').val()
      }

      project._id = Projects.insert(project);
      Router.go('project', project);
    }
  });
}
