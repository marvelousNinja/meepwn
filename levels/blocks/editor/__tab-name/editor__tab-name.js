if(Meteor.isClient) {
  Template.editor__tabName.events({
    'click .editor__tab-name': function(e) {
      Meteor.call('openFile', Session.projectId(), this._id);
    }
  });
}
