/*! Node Blog - v0.0.1 - 2014-02-23 */'use strict';
(function (exports) {
  exports.FilterModule = angular.module('chinook.filters', []);
  exports.ServiceModule = angular.module('chinook.services', []);
  exports.ProviderModule = angular.module('chinook.providers', []);
  exports.DirectiveModule = angular.module('chinook.directives', []);
  exports.CtrlModule = angular.module('chinook.controllers', []);
  exports.MainModule = angular.module('chinook', [
    'ngRoute',
    'chinook.filters',
    'chinook.services',
    'chinook.providers',
    'chinook.directives',
    'chinook.controllers'
  ]);
}(window));;'use strict';
/* Providers */
// Demonstrate how to register services
// In this case it is a simple value service.
(function (module, exports) {
  var resources = exports.resources || {
      blog: {
        en: 'blog',
        zh: '\u535a\u5ba2',
        ko: '\ube14\ub85c\uadf8'
      },
      recentposts: {
        en: 'Recent Posts',
        zh: '\u6700\u8fd1\u6587\u7ae0',
        ko: '\ucd5c\uadfc\ud3ec\uc2a4\ud2b8'
      },
      comments: {
        en: 'comments',
        zh: '\u8bc4\u8bba',
        ko: '\ub313\uae00'
      },
      comment: {
        en: 'comment',
        zh: '\u8bc4\u8bba',
        ko: '\ub313\uae00'
      },
      junglelaw: {
        en: 'The Law of the Jungle',
        zh: '\u4e1b\u6797\u91cc\u7684\u6cd5\u5219',
        ko: '\uc815\uae00\uc758 \ubc95\uce59'
      },
      welcomeMessage: {
        en: 'Welcome to Jeff Jin\'s blog. Main topics include Single Page Application with Angular.JS, Node.JS, C#, ASP.net web api, NoSQL with MongoDB and RavenDB. Any interesting topics about .Net and JavaScript.',
        zh: '\u6b22\u8fce\u6765\u5230\u6211\u7684\u535a\u5ba2',
        ko: '\uc815\uae00\uc758 \ubc95\uce59 \ube14\ub85c\uadf8\uc5d0 \uc628\uac83\uc744 \ud658\uc601\ud569\ub2c8\ub2e4.'
      }
    };
  function Localizer(defaultLocale) {
    return function (key, locale) {
      if (!key) {
        return '';
      }
      locale = locale || defaultLocale || navigator.language.split('-')[0];
      ;
      var temp = resources[key];
      if (!temp) {
        return key;
      }
      var value = temp[locale];
      if (!value && locale !== defaultLocale) {
        value = temp[defaultLocale];
        if (!value) {
          return key;
        }
      }
      return value;
    };
  }
  ;
  module.provider('localize', function LocalizeProvider() {
    var defaultLocale = 'en';
    this.setDefaultLocale = function (value) {
      defaultLocale = value || defaultLocale;
    };
    this.$get = [
      'locale',
      function localizeFactory(locale) {
        // let's assume that the UnicornLauncher constructor was also changed to
        // accept and use the useTinfoilShielding argument
        return new Localizer(locale);
      }
    ];
  });
}(window.ProviderModule, window));;'use strict';
/* Services */
// Demonstrate how to register services
// In this case it is a simple value service.
(function (module) {
  module.factory('adminBlogService', [
    '$http',
    'identity',
    function ($http, identity) {
      var addPost = function (post) {
        //$http.default.transforResponse does it automatically
        //var jsonPost = JSON.stringify(post);
        return $http.post('/api/posts/', post, {
          transformRequest: [function (data, headersGetter) {
              //var header = headersGetter();
              data.createdOn = new Date();
              data.updatedOn = null;
              data.createdBy = identity.currentUser.name;
              data.updatedBy = null;
              return data;
            }].concat($http.defaults.transformRequest)
        });
      };
      var updatePost = function (postId, post) {
        return $http.put('/api/posts/' + postId, post, {
          transformRequest: [function (data, headersGetter) {
              //var header = headersGetter();
              data.updatedOn = new Date();
              data.updatedBy = identity.currentUser.name;
              return data;
            }].concat($http.defaults.transformRequest)
        });
      };
      return {
        addPost: addPost,
        updatePost: updatePost
      };
    }
  ]);
}(window.ServiceModule));'use strict';
/* Services */
// Demonstrate how to register services
// In this case it is a simple value service.
(function (module) {
  module.factory('adminTaskService', [
    '$http',
    function ($http) {
      var addTask = function () {
        return $http.get('/api/tasks');
      };
      var removeTask = function (id) {
        return $http.delete('/api/tasks/' + id);
      };
      return {
        addTask: addTask,
        removeTask: removeTask
      };
    }
  ]);
}(window.ServiceModule));'use strict';
/* Services */
// Demonstrate how to register services
// In this case it is a simple value service.
(function (module) {
  module.factory('fileService', [
    '$http',
    function ($http) {
      var upload = function () {
        return $http.post('/api/files');
      };
      var download = function (id) {
        return $http.get('/api/files/' + id);
      };
      var remove = function (id) {
        return $http.delete('/api/files/' + id);
      };
      var list = function () {
        return $http.get('/api/files/');
      };
      return {
        upload: upload,
        download: download,
        remove: remove,
        list: list
      };
    }
  ]);
}(window.ServiceModule));'use strict';
// General settings service
(function (module) {
  module.service('settingsService', [
    '$http',
    'identity',
    function ($http, identity) {
      var getSettings = function () {
        return $http.get('/api/settings/');
      };
      var updateSettings = function (settings) {
        return $http.put('/api/settings/', settings, {
          transformRequest: [function (data, headersGetter) {
              var header = headersGetter();
              data.updatedOn = new Date();
              data.updatedBy = identity.currentUser.name;
            }].concat($http.defaults.transformRequest)
        });
      };
      return {
        getSettings: getSettings,
        updateSettings: updateSettings
      };
    }
  ]);
}(window.ServiceModule));'use strict';
/* Services */
// Demonstrate how to register services
// In this case it is a simple value service.
(function (module) {
  module.factory('authService', [
    '$http',
    function ($http) {
      var authenticate = function (userName, pwd) {
        return $http.post('/api/authenticate', {
          username: userName,
          password: pwd
        });
      };
      var authorize = function (userName, pwd) {
        return $http.post('/api/authorize', {
          username: userName,
          password: pwd
        });
      };
      var getLoggedIn = function () {
        return $http.get('/api/loggedIn');
      };
      return {
        authenticate: authenticate,
        authorize: authorize,
        getLoggedIn: getLoggedIn
      };
    }
  ]);
}(window.ServiceModule));'use strict';
/* Services */
// Demonstrate how to register services
// In this case it is a simple value service.
(function (module) {
  module.factory('blogService', [
    '$http',
    '$q',
    '$sce',
    'commentService',
    'identity',
    'moment',
    'md5',
    'marked',
    'validatorService',
    function ($http, $q, $sce, commentService, identity, moment, md5, marked, validator) {
      console.log('Initializing Blog Service');
      var getList = function (dateRange, maxSize) {
        var queryString = '';
        if (dateRange) {
          if (validator.isValidDateString(dateRange.from)) {
            queryString = queryString + 'from=' + dateRange.from;
          }
          if (validator.isValidDateString(dateRange.to)) {
            queryString = queryString + '&to=' + dateRange.to;
          }
        }
        if (validator.isValidPositiveNumber(maxSize)) {
          if (queryString) {
            queryString = queryString + '&max=' + maxSize;
          } else {
            queryString = 'max=' + maxSize;
          }
        }
        if (queryString) {
          queryString = '?' + queryString;
        }
        return $http.get('/api/posts' + queryString);
      };
      var getDetails = function (id) {
        var deferred = $q.defer();
        if (id === 'new' || !id) {
          var newPost = {
              topic: 'topic for the new post',
              urlLink: '',
              metaTitle: '',
              summary: 'please write a summary',
              disableComment: false,
              status: 'draft',
              body: 'new post content here'
            };
          deferred.resolve({ data: newPost });
          return deferred.promise;
        }
        return $http.get('/api/posts/' + id, {
          transformResponse: $http.defaults.transformResponse.concat([function (data, headersGetter) {
              if (!data) {
                return null;
              }
              data.markedBody = $sce.trustAsHtml(marked(data.body));
              data.lastRevised = moment(data.updatedOn || data.createdOn).format('MMM Do YYYY');
              commentService.parse(data.comments);
              return data;
            }])
        });
      };
      return {
        getList: getList,
        getDetails: getDetails
      };
    }
  ]);
}(window.ServiceModule));'use strict';
/* Services */
// Demonstrate how to register services
// In this case it is a simple value service.
(function (module) {
  module.factory('commentService', [
    '$http',
    '$q',
    '$sce',
    'moment',
    'md5',
    'identity',
    'validatorService',
    function ($http, $q, $sce, moment, md5, identity, validator) {
      console.log('Initializing Comment Service');
      var getList = function (dateRange, maxSize) {
        var queryString = '';
        if (dateRange) {
          if (validator.isValidDateString(dateRange.from)) {
            queryString = queryString + 'from=' + dateRange.from;
          }
          if (validator.isValidDateString(dateRange.to)) {
            queryString = queryString + '&to=' + dateRange.to;
          }
        }
        if (validator.isValidPositiveNumber(maxSize)) {
          queryString = queryString + '&max=' + maxSize;
        }
        if (queryString) {
          queryString = '?' + queryString;
        }
        return $http.get('/api/comments' + queryString);
      };
      var parse = function (comments) {
        _.forEach(comments, function (cmt) {
          parseOne(cmt);
        });
        return comments;
      };
      var parseOne = function (cmt) {
        cmt.markedBody = $sce.trustAsHtml(marked(cmt.body));
        cmt.dateString = moment(cmt.createdOn).format('dddd, MMMM Do YYYY, h:mm:ss a');
        if (cmt.authorEmail) {
          cmt.authorEmailHash = md5(cmt.authorEmail);
        }
        return cmt;
      };
      //create or update
      var saveComment = function (comment, postId) {
        //update
        if (comment._id) {
          return $http.put('/api/comments/', {
            postId: postId,
            comment: comment
          }, {
            transformRequest: [function (data, headersGetter) {
                //var header = headersGetter();
                data.updatedOn = new Date();
                data.updatedBy = identity.currentUser.name;
                return data;
              }]
          });
        }
        //create
        return $http.post('/api/comments/', {
          postId: postId,
          comment: comment
        }, {
          transformRequest: [function (data, headersGetter) {
              //var header = headersGetter();
              data.createdOn = new Date();
              data.createdBy = identity.currentUser.name;
              data.updatedOn = null;
              data.updatedBy = null;
              return data;
            }].concat($http.defaults.transformRequest)
        });
      };
      var deleteComment = function (commentId) {
        return $http.delete('/api/comments/', { commentId: commentId });
      };
      return {
        getList: getList,
        save: saveComment,
        parse: parse,
        parseOne: parseOne,
        delete: deleteComment
      };
    }
  ]);
}(window.ServiceModule));/**
 * Created by jeffjin on 1/21/2014.
 */
'use strict';
/* Services */
/* This service will wrap AmplifyJS to store WIP data and restore accordingly */
(function (module) {
  module.factory('entityManager', [
    '$location',
    'storage',
    function ($location, storage) {
      //register and unregister entities to watch/unwatch
      //we need $scope to watch on an entity
      var register = function (login, entity, scope) {
      };
      var unregister = function (login, scope) {
      };  //store data into persistent storage
          //retrieve data from persistent storage
          //watch on
    }
  ]);
}(window.ServiceModule));/**
 * Created by Jeff Jin on 11/13/13.
 */
(function (module) {
  module.factory('httpInterceptor', [
    '$q',
    '$location',
    function ($q, $location) {
      return {
        'request': function (config) {
          //console.log(' request method');
          return config || $q.when(config);
        },
        'requestError': function (rejection) {
          console.log(' request error method');
          return $q.reject(rejection);
        },
        'response': function (response) {
          //console.log(' response method');
          return response || $q.when(response);
        },
        'responseError': function (rejection) {
          console.log(' response error method');
          if (rejection.status === 403) {
            //user not logged in, render login page
            $location.path('/#!/login').replace();
          } else {
            //do not have permission
            $location.path('/404').replace();
          }
          return $q.reject(rejection);
        }
      };
    }
  ]);
  module.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  });
}(window.ServiceModule));'use strict';
/* Services */
// Demonstrate how to register services
// In this case it is a simple value service.
(function (module) {
  module.factory('socketService', [
    '$rootScope',
    '$window',
    function ($rootScope, $window) {
      var socket = $window.io.connect();
      return {
        on: function (eventName, callback) {
          socket.on(eventName, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              callback.apply(socket, args);
            });
          });
        },
        emit: function (eventName, data, callback) {
          socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              if (callback) {
                callback.apply(socket, args);
              }
            });
          });
        },
        removeListeners: function (eventName) {
          socket.removeAllListeners(eventName);
        }
      };
    }
  ]);
}(window.ServiceModule));/**
 * Created by jeffjin on 1/21/2014.
 */
'use strict';
/* Services */
/* This service will wrap AmplifyJS to store WIP data and restore accordingly */
(function (module) {
  module.factory('storageService', [
    '$window',
    function ($window) {
      var set = function (key, value) {
        amplify.store(key, value);
      };
      var get = function (key) {
        return amplify.store(key);
      };
      return {
        get: get,
        set: set
      };
    }
  ]);
}(window.ServiceModule));'use strict';
/* Services */
// Demonstrate how to register services
// In this case it is a simple value service.
(function (module) {
  module.factory('validatorService', [
    '$sce',
    'moment',
    'md5',
    function ($sce, moment, md5) {
      console.log('Initializing Validator Service');
      var isValidPositiveNumber = function (n) {
        return !!n;
      };
      var isValidDateString = function (s) {
        return !!s;
      };
      return {
        isValidPositiveNumber: isValidPositiveNumber,
        isValidDateString: isValidDateString
      };
    }
  ]);
}(window.ServiceModule));'use strict';
/* Services */
//store logged in user identity information
(function (module) {
  module.value('identity', { currentUser: {} });
  module.value('marked', marked);
  module.value('moment', moment);
  module.value('md5', hex_md5);
  module.value('locale', 'en');
}(window.ServiceModule));;'use strict';
/* Filters */
(function (module) {
  module.filter('dateFormat', [
    'moment',
    function (moment) {
      return function (value, type) {
        if (type === 'short') {
          return moment(value).format('MMM Do YY');
        }
        if (type === 'long') {
          return moment(value).format('MMMM Do YYYY, h:mm:ss a');
        }
        return moment(value).format('MMM Do YYYY');
      };
    }
  ]);
}(window.FilterModule));'use strict';
/* Filters */
(function (module) {
  module.filter('pgLang', [
    '$q',
    function ($q) {
      var dirtyWords = [
          'fuck',
          'gay',
          'lesbian'
        ];
      return function (values) {
        var results = _.filter(values, function (value) {
            return _.indexOf(dirtyWords, value) === -1;
          });
        return results;
      };
    }
  ]);
}(window.FilterModule));;'use strict';
(function (module) {
  module.directive('jjComments', [
    'entityManager',
    function (entityManager) {
      return function (scope, element, attrs) {
      };
    }
  ]);
}(window.DirectiveModule));/**
 * Created by jeffjin on 1/21/2014.
 * This directive will enable saving as work in progress and automatically load it back
 */
'use strict';
(function (module) {
  module.directive('jjFlash', [
    '$timeout',
    function ($timeout) {
      return function (scope, element, attrs) {
      };
    }
  ]);
}(window.DirectiveModule));/**
 * Created by jeffjin on 1/21/2014.
 * This directive will enable saving as work in progress and automatically load it back
 */
'use strict';
(function (module) {
  module.directive('jjFooter', [
    '$window',
    function ($window) {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: '/app/js/directives/templates/footer.html',
        link: function (scope, element, attrs) {
        }
      };
    }
  ]);
}(window.DirectiveModule));/**
 * Created by jeffjin on 1/21/2014.
 * This directive will enable saving as work in progress and automatically load it back
 */
'use strict';
(function (module) {
  module.directive('jjHeader', [
    '$window',
    function ($window) {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: '/app/js/directives/templates/header.html',
        controller: 'HeaderCtrl'
      };
    }
  ]);
}(window.DirectiveModule));'use strict';
/* Directives */
(function (module) {
  module.directive('jjMarkdownEditor', [
    '$window',
    function ($window) {
      return {
        restrict: 'EA',
        replace: true,
        templateUrl: '/app/js/directives/templates/markdown-editor.html',
        scope: { content: '=' },
        link: function (scope, element, attrs) {
          var converter = Markdown.getSanitizingConverter();
          var editor = new Markdown.Editor(converter);
          editor.run();
        }
      };
    }
  ]);
}(window.DirectiveModule));/**
 * Created by jeffjin on 1/21/2014.
 * This directive will enable saving as work in progress and automatically load it back
 */
'use strict';
(function (module) {
  module.directive('jjNewComment', [
    'entityManager',
    function (entityManager) {
      return function (scope, element, attrs) {
      };
    }
  ]);
}(window.DirectiveModule));/**
 * Created by jeffjin on 1/21/2014.
 * This directive will enable saving as work in progress and automatically load it back
 */
'use strict';
(function (module) {
  module.directive('jjSearchForm', [
    '$window',
    function ($window) {
      return {
        restrict: 'E',
        replace: true,
        transclude: false,
        templateUrl: '/app/js/directives/templates/search.html',
        controller: 'BlogSearchCtrl'
      };
    }
  ]);
}(window.DirectiveModule));/**
 * Created by jeffjin on 1/21/2014.
 * This directive will enable saving as work in progress and automatically load it back
 */
'use strict';
(function (module) {
  module.directive('jjWip', [
    'entityManager',
    function (entityManager) {
      return function (scope, element, attrs) {
      };
    }
  ]);
}(window.DirectiveModule));'use strict';
/* Directives */
(function (module) {
  module.directive('ngEnter', function () {
    return function (scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    };
  });
}(window.DirectiveModule));;'use strict';
/* Controllers */
(function (module) {
  module.controller('AdminCommentsCtrl', [
    '$scope',
    '$routeParams',
    'adminBlogService',
    function ($scope, $routeParams, adminBlogService) {
      console.log('Initializing AdminCommentsCtrl Controller');
    }
  ]);
}(window.CtrlModule));'use strict';
/* Controllers */
(function (module) {
  module.controller('AdminFilesCtrl', [
    '$scope',
    '$routeParams',
    'fileService',
    'authService',
    function ($scope, $routeParams, fileService, authService) {
      console.log('Initializing AdminFilesCtrl Controller');
      fileService.list().then(function (result) {
        $scope.files = result.data;
      });
    }
  ]);
}(window.CtrlModule));'use strict';
/* Controllers */
(function (module) {
  module.controller('AdminHeaderCtrl', [
    '$scope',
    '$routeParams',
    'blogService',
    function ($scope, $routeParams, blogService) {
      console.log('Initializing AdminHeaderCtrl Controller');
    }
  ]);
}(window.CtrlModule));'use strict';
/* Controllers */
(function (module) {
  module.controller('AdminListCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    '$routeParams',
    function ($scope, $rootScope, $location, $routeParams) {
      console.log('Initializing AdminListCtrl Controller');
    }
  ]);
}(window.CtrlModule));'use strict';
/* Controllers */
(function (module) {
  module.controller('AdminPingBacksCtrl', [
    '$scope',
    '$routeParams',
    'adminBlogService',
    'authService',
    function ($scope, $routeParams, adminBlogService, authService) {
      console.log('Initializing AdminPingBacksCtrl Controller');
    }
  ]);
}(window.CtrlModule));'use strict';
/* Controllers */
(function (module) {
  module.controller('AdminPostEditCtrl', [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$location',
    '$window',
    '$timeout',
    '$q',
    'blogService',
    'adminBlogService',
    'storageService',
    'identity',
    'marked',
    function ($scope, $rootScope, $routeParams, $location, $window, $timeout, $q, blogService, adminBlogService, storageService, identity, marked) {
      console.log('Initializing AdminPostEditCtrl Controller');
      var postId = $routeParams.pid;
      console.log('Edit post with id ' + postId);
      var key = $location.path() + JSON.stringify(identity.currentUser);
      var tempPost = storageService.get(key);
      if (tempPost && $window.confirm('Would like to restore unsaved work?')) {
        $scope.post = tempPost;
        storageService.set(key, null);
      } else {
        blogService.getDetails(postId).then(function (result) {
          $scope.markDown = marked;
          if (result.data && result.data.comments) {
            for (var i = 0; i < result.data.comments.length; i++) {
              result.data.comments[i].markedBody = marked(result.data.comments[i].body);
              if (result.data.comments[i].authorEmail) {
                result.data.comments[i].authorEmailHash = hex_md5(result.data.comments[i].authorEmail);
              }
            }
          }
          $scope.post = result.data;
        }, function (result) {
          $window.alert(result.status + ',' + result.data);
        });
      }
      $scope.save = function (post) {
        var successCallback = function (result) {
          console.log(result);
          //redirect to page details in view mode
          $location.path('/posts/' + post.urlLink);
        };
        if (post._id) {
          adminBlogService.updatePost(post.urlLink, post).success(successCallback);
        } else {
          adminBlogService.addPost(post).success(successCallback);
        }
      };
      //Save WIP
      $scope.$watch('post', function (newValue, oldValue) {
        console.log(key);
        storageService.set(key, newValue);
      }, true);
    }
  ]);
}(window.CtrlModule));'use strict';
/* Controllers */
(function (module) {
  module.controller('AdminPostsCtrl', [
    '$scope',
    '$routeParams',
    'blogService',
    function ($scope, $routeParams, blogService) {
      console.log('Initializing AdminPostsCtrl Controller');
      var loadPosts = function () {
        blogService.getList({
          from: $routeParams.from,
          to: $routeParams.to
        }, 20).success(function (data, status, headers, config) {
          $scope.posts = data;
        }).error(function (data, status, headers, config) {
          $scope.posts = [];
          alert(status + ',' + data);
        });
      };
      $scope.deletePost = function (id) {
        if (confirm('Are you sure you want to delete ' + id)) {
          blogService.deletePost(id).then(function () {
            loadPosts();
          });
        }
      };
      loadPosts();
    }
  ]);
}(window.CtrlModule));'use strict';
/* Controllers */
(function (module) {
  module.controller('AdminSettingsCtrl', [
    '$scope',
    '$routeParams',
    'settingsService',
    function ($scope, $routeParams, settingsService) {
      console.log('Initializing AdminSettingsCtrl Controller');
    }
  ]);
}(window.CtrlModule));'use strict';
/* Controllers */
(function (module) {
  module.controller('AdminTasksCtrl', [
    '$scope',
    '$routeParams',
    'adminTaskService',
    'authService',
    function ($scope, $routeParams, adminTaskService, authService) {
      console.log('Initializing AdminTasksCtrl Controller');
    }
  ]);
}(window.CtrlModule));'use strict';
/* Controllers */
(function (module) {
  module.controller('BlogDetailsCtrl', [
    '$scope',
    '$routeParams',
    'blogService',
    'commentService',
    'socketService',
    'identity',
    function ($scope, $routeParams, blogService, commentService, socketService, identity) {
      console.log('Initializing Blog Details Controller');
      var postId = $routeParams.pid;
      var commentInsertKey = 'comments-inserted-' + postId;
      $scope.addComment = function (cmt) {
        commentService.save(cmt, postId).then(function () {
          //clear the comment form
          $scope.post.activeComment = {};
        });
      };
      $scope.editComment = function (cmt) {
        $scope.editCmt = cmt;
      };
      $scope.updateComment = function (cmt) {
        commentService.save(cmt, postId).then(function () {
          //clear the comment form
          $scope.editCmt = null;
        });
      };
      //setup events for slave piece move
      socketService.on(commentInsertKey, function (data) {
        console.log(commentInsertKey, data);
        commentService.parseOne(data);
        $scope.post.comments.push(data);
      });
      $scope.$on('$destroy', function () {
        socketService.removeListeners(commentInsertKey);
      });
      return blogService.getDetails(postId).success(function (result) {
        $scope.hasEditRight = identity.currentUser && (identity.currentUser.isAdmin || identity.currentUser.isOwner);
        $scope.post = result;
      }).error(function (data, status) {
        console.error(status + ',' + data);
        $scope.hasEditRight = false;
        $scope.post = {};
      });
    }
  ]);
}(window.CtrlModule));'use strict';
/* Controllers */
(function (module) {
  module.controller('BlogListCtrl', [
    '$scope',
    'blogService',
    '$routeParams',
    function ($scope, blogService, $routeParams) {
      console.log('Initializing Blog List Controller');
      return blogService.getList({
        from: $routeParams.from,
        to: $routeParams.to
      }, 20).success(function (data) {
        $scope.posts = data;
      }).error(function (data, status) {
        console.error(status + ',' + data);
        $scope.posts = [];
      });
    }
  ]);
}(window.CtrlModule));'use strict';
/* Controllers */
(function (module) {
  module.controller('BlogSearchCtrl', [
    '$scope',
    '$location',
    function ($scope, $location) {
      console.log('Initializing Blog Search Controller');
      $scope.search = function (keyword) {
        console.log('Searching for ' + keyword);
        $location.path('/searchResult/' + keyword);
      };
    }
  ]);
}(CtrlModule));'use strict';
/* Controllers */
(function (module) {
  module.controller('ErrorCtrl', [
    '$scope',
    '$routeParams',
    function ($scope, $routeParams) {
      console.log('Initializing Error Controller');
      $scope.headerText = 'error';
    }
  ]);
}(window.CtrlModule));'use strict';
/* Controllers */
(function (module) {
  module.controller('HeaderCtrl', [
    '$scope',
    'localize',
    function ($scope, translate) {
      console.log('Initializing Header Controller');
      $scope.headerText = 'The law of the jungle';  //console.log('"blog" translates to ' + translate('blog', 'zh') + ' in Chinese.');
    }
  ]);
}(window.CtrlModule));'use strict';
/* Controllers */
(function (module) {
  module.controller('SiteLoginCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    'authService',
    'identity',
    function ($scope, $rootScope, $location, authService, identity) {
      console.log('Initializing Site Login Controller');
      $scope.login = function (username, password) {
        console.log('validating user name ' + username + ' with password ' + password);
        authService.authenticate(username, password).then(function (result) {
          console.log('success for ' + result);
          identity.currentUser = result.data;
          $location.path('/admin');
        }, function (reason) {
          console.error(reason.data);
          $location.path('/login').replace();
        });
      };
    }
  ]);
}(CtrlModule));;'use strict';
// Declare app level module which depends on filters, and services
(function (module) {
  var checkAuthentication = function ($q, $timeout, $http, $location, $rootScope) {
    // Initialize a new promise
    var deferred = $q.defer();
    // Make an AJAX call to check if the user is logged in
    $http.get('/api/loggedIn').success(function (user) {
      // Authenticated
      if (user)
        $timeout(deferred.resolve, 0);  // Not Authenticated
      else {
        $rootScope.message = 'You need to log in.';
        $timeout(function () {
          deferred.reject();
        }, 0);
        $location.url('/login');
      }
    });
    return deferred.promise;
  };
  module.config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: '/app/partials/posts.html',
        controller: 'BlogListCtrl'
      });
      $routeProvider.when('/login', {
        templateUrl: '/app/partials/login.html',
        controller: 'SiteLoginCtrl'
      });
      $routeProvider.when('/posts/:pid', {
        templateUrl: '/app/partials/blogDetails.html',
        controller: 'BlogDetailsCtrl'
      });
      $routeProvider.when('/advancedSearch/:key/:start/:end', {
        templateUrl: '/app/partials/advancedSearch.html',
        controller: 'BlogSearchCtrl'
      });
      $routeProvider.when('/searchResult', {
        templateUrl: '/app/partials/searchResult.html',
        controller: 'BlogSearchCtrl'
      });
      //admin routes
      $routeProvider.when('/admin', {
        templateUrl: '/app/partials/admin/adminList.html',
        controller: 'AdminListCtrl',
        resolve: { isAuthenticated: checkAuthentication }
      });
      $routeProvider.when('/admin/posts', {
        templateUrl: '/app/partials/admin/posts.html',
        controller: 'AdminPostsCtrl',
        resolve: { isAuthenticated: checkAuthentication }
      });
      $routeProvider.when('/admin/posts/new', {
        templateUrl: '/app/partials/admin/create.html',
        controller: 'AdminPostEditCtrl',
        resolve: { isAuthenticated: checkAuthentication }
      });
      $routeProvider.when('/admin/posts/:pid', {
        templateUrl: '/app/partials/admin/edit.html',
        controller: 'AdminPostEditCtrl',
        resolve: { isAuthenticated: checkAuthentication }
      });
      $routeProvider.when('/admin/comments', {
        templateUrl: '/app/partials/admin/comments.html',
        controller: 'AdminCommentsCtrl',
        resolve: { isAuthenticated: checkAuthentication }
      });
      $routeProvider.when('/admin/tasks', {
        templateUrl: '/app/partials/admin/tasks.html',
        controller: 'AdminTasksCtrl',
        resolve: { isAuthenticated: checkAuthentication }
      });
      $routeProvider.when('/admin/files', {
        templateUrl: '/app/partials/admin/files.html',
        controller: 'AdminFilesCtrl',
        resolve: { isAuthenticated: checkAuthentication }
      });
      $routeProvider.when('/admin/pingBacks', {
        templateUrl: '/app/partials/admin/pingBacks.html',
        controller: 'AdminPingBacksCtrl',
        resolve: { isAuthenticated: checkAuthentication }
      });
      $routeProvider.when('/admin/settings', {
        templateUrl: '/app/partials/admin/settings.html',
        controller: 'AdminSettingsCtrl',
        resolve: { isAuthenticated: checkAuthentication }
      });
      //error routes
      $routeProvider.when('/404', {
        templateUrl: '/app/partials/error.html',
        controller: 'ErrorCtrl'
      });
      //default routes
      $routeProvider.otherwise({ redirectTo: '/' });
    }
  ]);
  module.config([
    '$locationProvider',
    function ($locationProvider) {
      $locationProvider.html5Mode(false).hashPrefix('!');
    }
  ]);
  module.config([
    'localizeProvider',
    function (localizeProvider) {
      console.log('configuring localize providers');
      localizeProvider.setDefaultLocale('en');
    }
  ]);
  module.run(function ($rootScope, $window) {
    $rootScope.r = $window.r;
  });
}(window.MainModule));