Meteor.methods({
  updateSelection: function(workspaceId, selection) {
    Workspaces.update(workspaceId, { $set: { selection: selection } });
  },

  updateCursor: function(workspaceId, cursor) {
    Workspaces.update(workspaceId, { $set: { cursor: cursor } });
  }
});
