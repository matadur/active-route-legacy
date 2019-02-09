Package.describe({
  git: 'https://github.com/matadur/active-route-legacy.git',
  name: 'matadur:active-route-legacy',
  summary: 'Active route helpers',
  version: '2.3.4'
});

Package.onUse(function(api) {
  api.versionsFrom(['1.0', '1.2']);

  api.use([
    'check',
    'reactive-dict',
    'underscore'
  ]);

  api.use([
    'staringatlights:flow-router@2.12.2',
    'kadira:flow-router@2.0.0',
    'meteorhacks:flow-router@1.8.0',
    'iron:router@1.0.0',
    'templating'
  ], {weak: true});

  api.export('ActiveRoute');

  api.addFiles('lib/activeroute.js');

  api.addFiles('client/helpers.js', 'client');
  
});
