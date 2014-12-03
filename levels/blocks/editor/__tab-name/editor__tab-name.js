if(Meteor.isClient) {
  Template.editor__tabName.events({
    'click .editor__tab-name': function(e) {
      Meteor.call('openFile', Router.current().params._id, this._id);
    }
  });
}
