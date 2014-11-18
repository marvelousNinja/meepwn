this.Documents = new Meteor.Collection("documents");

if (Meteor.isClient) {
  Template.docList.helpers({
  documents: function() {
    return Documents.find();
  }
});

Template.docList.events = {
  "click button": function() {
    return Documents.insert({
      title: "untitled"
    }, function(err, id) {
      if (!id) {
        return;
      }
      return Session.set("document", id);
    });
  }
};

Template.docItem.helpers({
  current: function() {
    return Session.equals("document", this._id);
  }
});

Template.docItem.events = {
  "click a": function(e) {
    e.preventDefault();
    return Session.set("document", this._id);
  }
};

Template.docTitle.helpers({
  title: function() {
    var _ref;
    return (_ref = Documents.findOne(this + "")) != null ? _ref.title : void 0;
  }
});

Template.editor.helpers({
  docid: function() {
    return Session.get("document");
  }
});

Template.editor.events = {
  "keydown input[name=title]": function(e) {
    var id;
    if (e.keyCode !== 13) {
      return;
    }
    e.preventDefault();
    $(e.target).blur();
    id = Session.get("document");
    return Documents.update(id, {
      title: e.target.value
    });
  },
  "click button": function(e) {
    var id;
    e.preventDefault();
    id = Session.get("document");
    Session.set("document", null);
    return Meteor.call("deleteDocument", id);
  }
};

Template.editor.helpers({
  cm: function() {
    return Session.equals("editorType", "cm");
  },
  configCM: function() {
    return function(cm) {
      cm.setOption("theme", "default");
      cm.setOption("lineNumbers", true);
      cm.setOption("lineWrapping", true);
      cm.setOption("smartIndent", true);
      return cm.setOption("indentWithTabs", true);
    };
  }
});
}