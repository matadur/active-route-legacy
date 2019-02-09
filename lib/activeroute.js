var ActiveRoute, checkParams, checkRouteOrPath, checkRouterPackages, errorMessages, fr, ir, test;

share = share || {}

fr = ir = null;

checkRouteOrPath = function(arg) {
  var error;
  try {
    return check(arg, Match.OneOf(RegExp, String));
  } catch (_error) {
    error = _error;
    throw new Error(errorMessages.invalidRouteNameArgument);
  }
};

checkParams = function(arg) {
  var error;
  try {
    return check(arg, Object);
  } catch (_error) {
    error = _error;
    throw new Error(errorMessages.invalidRouteParamsArgument);
  }
};

checkRouterPackages = function() {
  var ref, ref1, ref2;
  fr = (ref = (ref1 = (ref2 = Package['staringatlights:flow-router']) != null ? ref2 : Package['kadira:flow-router']) != null ? ref1 : Package['meteorhacks:flow-router']) != null ? ref : Package['kadira:flow-router-ssr'];
  ir = Package['iron:router'];
  if (!(ir || fr)) {
    throw new Error(errorMessages.noSupportedRouter);
  }
};

errorMessages = {
  noSupportedRouter: 'No supported router installed. Please install ' + 'staringatlights:flow-router or iron:router or meteorhacks:flow-router.',
  invalidRouteNameArgument: 'Invalid argument, must be String or RegExp.',
  invalidRouteParamsArgument: 'Invalid arguemnt, must be Object.'
};

share.config = new ReactiveDict('legacy_activeRouteConfig')

share.config.setDefault({
  activeClass: 'active',
  caseSensitive: true,
  disabledClass: 'disabled'
});

test = function(value, pattern) {
  var result;
  if (!value) {
    return false;
  }
  if (Match.test(pattern, RegExp)) {
    result = value.search(pattern);
    result = result > -1;
  } else if (Match.test(pattern, String)) {
    if (share.config.equals('caseSensitive', false)) {
      value = value.toLowerCase();
      pattern = pattern.toLowerCase();
    }
    result = value === pattern;
  }
  return result != null ? result : result = false;
};

ActiveRoute = {
  config: function() {
    return this.configure.apply(this, arguments);
  },
  configure: function(options) {
    if (Meteor.isServer) {
      return;
    }
    share.config.set(options);
  },
  name: function(routeName, routeParams) {
    var controller, currentPath, currentRouteName, path, ref, ref1;
    if (routeParams == null) {
      routeParams = {};
    }
    checkRouterPackages();
    if (Meteor.isServer && !Package['kadira:flow-router-ssr']) {
      return;
    }
    checkRouteOrPath(routeName);
    checkParams(routeParams);
    if (ir) {
      if (!_.isEmpty(routeParams) && Match.test(routeName, String)) {
        controller = ir.Router.current();
        if (controller != null ? controller.route : void 0) {
          currentPath = controller != null ? controller.location.get().path : void 0;
        }
        path = ir.Router.path(routeName, routeParams);
      } else {
        currentRouteName = (ref = ir.Router.current()) != null ? (ref1 = ref.route) != null ? typeof ref1.getName === "function" ? ref1.getName() : void 0 : void 0 : void 0;
      }
    }
    if (fr) {
      if (!_.isEmpty(routeParams) && Match.test(routeName, String)) {
        fr.FlowRouter.watchPathChange();
        if (currentPath == null) {
          currentPath = fr.FlowRouter.current().path;
        }
        if (path == null) {
          path = fr.FlowRouter.path(routeName, routeParams);
        }
      } else {
        if (currentRouteName == null) {
          currentRouteName = fr.FlowRouter.getRouteName();
        }
      }
    }
    return test(currentPath || currentRouteName, path || routeName);
  },
  path: function(path) {
    var controller, currentPath;
    checkRouterPackages();
    if (Meteor.isServer) {
      return;
    }
    checkRouteOrPath(path);
    if (ir) {
      controller = ir.Router.current();
      if (controller != null ? controller.route : void 0) {
        currentPath = controller != null ? controller.location.get().path : void 0;
      }
    }
    if (fr) {
      fr.FlowRouter.watchPathChange();
      if (currentPath == null) {
        currentPath = fr.FlowRouter.current().path;
      }
    }
    return test(currentPath, path);
  }
};
