Meteor.methods({
  updateCursor: function(workspaceId, cursorPosition) {
    Workspaces.update(workspaceId, { $set: { cursorPosition: cursorPosition } });
  }
});
