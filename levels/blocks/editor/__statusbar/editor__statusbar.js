if(Meteor.isClient) {
  Template.editor__statusbar.helpers({
    cursorPosition: function() {
      var workspace = Workspaces.findOne(this.workspaceId, {
        fields: { cursorPosition: 1 }
      });

      if(workspace) {
        var position = workspace.cursorPosition.start;
        return ['Line', position.row + 1, position.column + 1].join(' ');
      }
    }
  });
}
