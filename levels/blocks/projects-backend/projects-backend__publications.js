if(Meteor.isServer) {
  Meteor.publishComposite('projects', {
    find: function() {
      return Meteor.users.find({ _id: this.userId });
    },
    children: [
      {
        find: function(user) {
          var projectIds = user.roles.projects.filter(function(role) {
            return role.indexOf('read-') === 0;
          }).map(function(role) {
            return role.split('-')[1];
          });

          return Projects.find({ _id: { $in: projectIds } });
        }
      }
    ]
  });
}
