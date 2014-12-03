if(Meteor.isClient) {
  Template.editor__statusbar.helpers({
    cursorPosition: function() {
      var workspace = Workspaces.findOne(this.workspaceId, {
        fields: { cursor: 1 }
      });

      console.log(this.workspaceId);

      if(workspace) {
        var position = workspace.cursor;

        if(position) {
          return [
            'Line:', position.row + 1,
            'Column:', position.column + 1
          ].join(' ');
        }
      }
    }
  });
}
