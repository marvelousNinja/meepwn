this.Permissions = {
  can: function(user, action, target) {
    if(!user) return false;
    var permission_key = action + 'PermissionUserIds';
    return _.include(target[permission_key], user._id);
  },
  grant: function(user, actions, target) {
    _.each(actions, function(action) {
      var permission_key = action + 'PermissionUserIds';
      target[permission_key] = target[permission_key] || [];
      target[permission_key].push(user._id);
    });
  }
}
