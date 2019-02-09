Package.describe({
  git: 'https://github.com/matadur/active-route-legacy.git',
  name: 'matadur:active-route-legacy',
  summary: 'Active route helpers',
  version: '2.4.0'
});

Package.onUse(function(api) {
  api.versionsFrom(['1.0', '1.2']);

  api.use([
    'ecmascript',
    'check',
    'reactive-dict',
    'underscore'
  ]);

  api.use([
    'templating',
    'ostrio:flow-router-extra@3.6.2'
  ], {weak: true});

  api.export('ActiveRoute');

  api.addFiles('lib/activeroute.js');

  api.addFiles('client/helpers.js', 'client');

});
