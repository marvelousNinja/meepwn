this.Ancestry = {
  calculateIds: function(parentId, parentCollection) {
    var parent = parentCollection.findOne(parentId);
    if(parent) {
      var ancestorIds = parent.ancestorIds.slice();
      ancestorIds.push(parentId);
      return ancestorIds;
    } else {
      return [];
    }
  }
}
