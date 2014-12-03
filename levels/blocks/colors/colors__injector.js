if(Meteor.isClient) {
  var colorFromStr = function (str) {
    for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
    for (var i = 0, color = "#"; i < 3; color += ("00" + ((hash >> i++ * 8) & 0xFF).toString(16)).slice(-2));
    return color;
  };

  Tracker.autorun(function() {
    Meteor.users.find().forEach(function(user) {
      if(typeof vein !== 'undefined') {
        vein.inject('.user_' + user._id, {
          'background-color': colorFromStr(user._id),
          'border-left': '2px solid ' + colorFromStr(user._id)
        });
      }
    });
  });
}



