if(Meteor.isServer) {
  ServiceConfiguration.configurations.remove({
    service: { $in: ['github', 'google', 'twitter'] }
  });

  ServiceConfiguration.configurations.insert({
    service: 'github',
    clientId: Meteor.settings.github.clientId,
    loginStyle: 'popup',
    secret: Meteor.settings.github.secret
  });

  ServiceConfiguration.configurations.insert({
    service: 'google',
    clientId: Meteor.settings.google.clientId,
    loginStyle: 'popup',
    secret: Meteor.settings.google.secret
  });

  ServiceConfiguration.configurations.insert({
    service: 'twitter',
    consumerKey: Meteor.settings.twitter.consumerKey,
    loginStyle: 'popup',
    secret: Meteor.settings.twitter.secret
  });
}
