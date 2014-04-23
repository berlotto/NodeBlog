/**
 * Created by jeffjin on 2/18/2014.
 */
'use strict';

(function(exports){

   var images = [
      {
         id: '31',
         title: 'Title 1',
         desc: 'Desc 1',
         url: '/public/images/mason/_DSC7370.JPG',
         dateTime: new Date(2014, 12, 22)
      },
      {
         id: '32',
         title: 'Title 2',
         desc: 'Desc 2',
         url: '/public/images/mason/_DSC7371.JPG',
         dateTime: new Date(2014, 11, 12)
      },
      {
         id: '33',
         title: 'Title 3',
         desc: 'Desc 3',
         url: '/public/images/mason/_DSC7372.JPG',
         dateTime: new Date(2014, 10, 22)
      },
      {
         id: '3',
         title: 'Title 4',
         desc: 'Desc 4',
         url: '/public/images/mason/_DSL7378.JPG',
         dateTime: new Date(2014, 9, 22)
      },
      {
         id: '322',
         title: 'Title 1',
         desc: 'Desc 1',
         url: '/public/images/mason/_DSC7370.JPG',
         dateTime: new Date(2014, 8, 22)
      },
      {
         id: '103',
         title: 'Title 2',
         desc: 'Desc 2',
         url: '/public/images/mason/_DSC7371.JPG',
         dateTime: new Date(2014, 7, 12)
      },
      {
         id: '883',
         title: 'Title 3',
         desc: 'Desc 3',
         url: '/public/images/mason/_DSC7372.JPG',
         dateTime: new Date(2013, 12, 22)
      },
      {
         id: '3',
         title: 'Title 4',
         desc: 'Desc 4',
         url: '/public/images/mason/_DSL7378.JPG',
         dateTime: new Date(2013, 11, 22)
      },
      {
         id: '53',
         title: 'Title 1',
         desc: 'Desc 1',
         url: '/public/images/mason/_DSC7370.JPG',
         dateTime: new Date(2012, 11, 22)
      },
      {
         id: '993',
         title: 'Title 2',
         desc: 'Desc 2',
         url: '/public/images/mason/_DSC7371.JPG',
         dateTime: new Date(2010, 10, 12)
      },
      {
         id: '83',
         title: 'Title 3',
         desc: 'Desc 3',
         url: '/public/images/mason/_DSC7372.JPG',
         dateTime: new Date(2010, 9, 22)
      },
      {
         id: '13',
         title: 'Title 4',
         desc: 'Desc 4',
         url: '/public/images/mason/_DSL7378.JPG',
         dateTime: new Date(2010, 8, 22)
      },
      {
         id: '322',
         title: 'Title 1',
         desc: 'Desc 1',
         url: '/public/images/mason/_DSC7370.JPG',
         dateTime: new Date(2010, 7, 22)
      },
      {
         id: '344',
         title: 'Title 2',
         desc: 'Desc 2',
         url: '/public/images/mason/_DSC7371.JPG',
         dateTime: new Date(2010, 6, 12)
      },
      {
         id: '365',
         title: 'Title 3',
         desc: 'Desc 3',
         url: '/public/images/mason/_DSC7372.JPG',
         dateTime: new Date(2010, 5, 22)
      },
      {
         id: '93',
         title: 'Title 4',
         desc: 'Desc 4',
         url: '/public/images/mason/_DSL7378.JPG',
         dateTime: new Date(2010, 3, 22)
      }
   ];

   var comments = [
      {_id:'tr4gwvw34t5', authorName:'Jeff0', authorEmail:'a0@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 2, 3, 3, 3, 3)},
      {_id:'d2f3rdf34g3', authorName:'Jeff1', authorEmail:'a1@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 3, 3, 3, 3, 3)},
      {_id:'d2f3rdf34g4', authorName:'Jeff2', authorEmail:'a2@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 4, 3, 3, 3, 3)},
      {_id:'d2f3rdf34g5', authorName:'Jeff3', authorEmail:'a3@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 5, 3, 3, 3, 3)},
      {_id:'d2f3rdf34g6', authorName:'Jeff4', authorEmail:'a4@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 6, 3, 3, 3, 3)},
      {_id:'d2f3rdf34g7', authorName:'Jeff5', authorEmail:'a5@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 7, 3, 3, 3, 3)},
      {_id:'d2f3rdf34g8', authorName:'Jeff6', authorEmail:'a6@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 8, 3, 3, 3, 3)},
      {_id:'d2f3rdf34g9', authorName:'Jeff7', authorEmail:'a7@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 9, 3, 3, 3, 3)},
      {_id:'d2f3rdf34g11', authorName:'Jeff8', authorEmail:'a8@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 10, 3, 3, 3, 3)},
      {_id:'d2f3rdf34g31', authorName:'Jeff9', authorEmail:'a9@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 12, 3, 3, 3, 3)},
      {_id:'d2f3rdf34g32', authorName:'Jeff10', authorEmail:'a10@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2014, 1, 2, 3, 3, 3, 3)},
      {_id:'d2f3rdf34g33', authorName:'Jeff11', authorEmail:'a11@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 11, 2, 3, 3, 3, 3)},
      {_id:'d2f3rdf34g34', authorName:'Jeff12', authorEmail:'a12@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 2, 2, 3, 3, 3, 3)},
      {_id:'d2f3rdf34g35', authorName:'Jeff13', authorEmail:'a13@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 1, 2, 3, 3, 3, 3)}
   ];

   var posts = [];//sample test data
   posts.push({
      createdOn: new Date(2012, 12, 11, 13, 0, 0, 0),
      updatedOn: new Date(2012, 12, 21, 13, 0, 0, 0),
      createdBy: 'Jeff Jin',
      updatedBy: 'Administrator',
      topic: 'Singleton with JavaScript',
      urlLink: 'javascript-singleton',
      status: 'public',
      disableComment: true,
      summary: 'Singleton is one of the most widely used design patterns in any programming languages.',
      body: 'What would be expected from a Sington class?\r\n\r\nLet\'s start from some tests.\r\n\r\n    describe(\"Singleton constructor test\", function () {\r\n\r\n      it(\"Singleton constructor should always return the same isntance\", function () {\r\n          var config1 = new Config();\r\n          var config2 = new Config();\r\n          expect(config1.applicationName).toEqual(config2.applicationName);\r\n          expect(config1.maxConnections).toEqual(1000);\r\n          expect(config2.maxConnections).toEqual(1000);\r\n          expect(config1).toEqual(config2);\r\n      });\r\n    \r\n      it(\"Singleton instance change will be reflected in other referenced objects\", function () {\r\n          var config1 = new Config();\r\n          var config2 = new Config();\r\n          config1.maxConnections = 2000;\r\n          expect(config1.maxConnections).toEqual(2000);\r\n          expect(config2.maxConnections).toEqual(2000);\r\n      });\r\n    });\r\n\r\nFrom the test expectations, we can see that only one Config instance is ever created.\r\n\r\nWe need also to make sure prototype inheritance is not affected by implementing this singleton pattern.\r\n\r\nThe important idea when implementing this is that function in JavaScript is special object, so that it can also have properties, which is kind of singleton, similar to static properties in C#.\r\n\r\n  \r\n\r\n    function Config() {\r\n      var instance = this;\r\n\r\n      Config = function Config(){\r\n        return instance;\r\n      }\r\n\r\n      Config.prototype = this;\r\n\r\n      instance = new Config();\r\n\r\n      instance.constructor = Config;\r\n\r\n      instance.applicationName = \"Jeff\'s Personal Website\";\r\n      instance.urls = {};\r\n      instance.maxConnections = 1000;\r\n      instance.logger = console;\r\n\r\n      return instance;\r\n     }\r\n\r\nFirst an private instance is defined using closure and then function definition and prototype as well as constructor is redefined.\r\n\r\nUsing closure, the original instance is still available, when the constructor is called second time, thus making sure the same instance is always returned.\r\n',
      comments: [comments[0], comments[1]]
   });
   posts.push({
      createdOn: new Date(2011, 12, 1, 11, 0, 0, 0),

      updatedOn: new Date(2011, 1, 21, 13, 0, 0, 0),
      createdBy: 'Jeff Jin',
      updatedBy: 'Administrator',
      topic: 'Aspect Oriented Programming with JavaScript',
      urlLink: 'aop-with-javascript',
      status: 'public',
      disableComment: true,
      summary: 'Aspect Oriented Programming has always been an interesting topic for me. With JavaScript it is not that obvious.',
      body: 'I really enjoyed attribute based programming in .Net, especially ASP.NET MVC. \r\nFollowing are some examples from .Net,\r\n\r\n    \r\n    [System.Web.Mvc.Authorize]\r\n    public class AccountController\r\n\r\n    [System.Web.Mvc.HttpPost]\r\n    [ValidateAntiForgeryToken]\r\n    public ActionResult LogOff()    \r\n\r\nThese attribute will execute certain logic before or after a method call to add custom behaviour without duplicating the logic within every method.\r\n\r\nI recently did some search on implementing AOP with Javascript and ended up at this blog [post][1]. It was great article but I wanted to do a little bit more with AOP and with a little bit cleaner implementation.\r\n\r\n1) I didn\'t want to have a global function to attach behaviours, instead, I would like to setup up at Function.prototype, so that every class can have a way to setup aspect without resorting to helper function.\r\n\r\n2) I would like to support ajax calls, which is necessary to implement security aspect on client side.\r\n\r\nHere are the steps I started implementing AOP in JavaScript.\r\n\r\nLet\'s add a simple test first,\r\n\r\n    var People = function() {\r\n            this.firstName = \"Jeff\";\r\n            this.lastName = \"Jin\";\r\n            this.email = \"email@example.com\";\r\n        };\r\n        People.prototype = {\r\n            getFullName: function () {\r\n                logger.log(\'getFullName (applyBefore) is being called\');\r\n                return this.firstName + \" \" + this.lastName;\r\n            },\r\n            sendNotification: function() {\r\n                logger.log(\'Sending email to \' + this.email);\r\n            }\r\n        };\r\n\r\n        var logAspect = function (error, success, context, args) {\r\n            logger.log(\'log aspect (applyBefore) is being called\');\r\n            if (success) {\r\n                return success();\r\n            }\r\n            return error();\r\n        };\r\n\r\n        People.applyBefore(logAspect, \'getFullName\');\r\n\r\n        var p1 = new People();\r\n        var result = p1.getFullName();\r\n        expect(result).toBe(\"Jeff Jin\");\r\n\r\nI would like to setup aspect at method level with constructor People so that each object created with People constructor will have the same behaviour.\r\nlogAspect is my logging aspect, which I want to execute before getFullName is called. No async call is involved in this case.\r\naspect must follow certain constraints \"(error, success, context, args) \" similar to nodeJs pattern.\r\n\r\nImplementation:\r\n\r\n    var invalidAspect = new Error(\"Missing a valid aspect. Aspect is not a function.\"),\r\n        invalidMethod = new Error(\"Missing valid method to apply aspect on.\");\r\n\r\n    ///Parameters: aspect - defines the methods we want call before or/and \r\n    ///             after each method call ob target obejct\r\n    ///            targetFuncNames - target function names to apply aspects\r\n    ///Return: it should return a new object with all aspects setup on target object\r\n    Function.prototype.applyBefore = function (aspect, targetFuncNames) {\r\n        if (typeof (aspect) != \'function\')\r\n            throw invalidAspect;\r\n\r\n        if (typeof (targetFuncNames) != \'object\')\r\n            targetFuncNames = Array(targetFuncNames);\r\n        \r\n        var targetObj = this;\r\n        //error handling function\r\n        \r\n        // Copy the properties over onto the new prototype\r\n        for (var i = 0, len = targetFuncNames.length; i < len; i++) {\r\n            var funcName = targetFuncNames[i];\r\n            var targetFunc = targetObj.prototype[funcName];\r\n\r\n            if (!targetFunc)\r\n                throw invalidMethod;\r\n            \r\n           \r\n            targetObj.prototype[funcName] = function () {\r\n                var self = this, args = arguments;\r\n                var success = function() {\r\n                    return targetFunc.apply(self, args);\r\n                };\r\n                var error = function () {\r\n                    logger.log(\'applyBefore aspect failed to pass\');\r\n                    //log the error and throw new error\r\n                    throw new Error(\'applyBefore aspect failed to pass\');\r\n                };\r\n\r\n                var aspectResult = aspect.apply(null, Array.prototype.concat([error, success, self], args));\r\n                return aspectResult;\r\n            };\r\n        }\r\n    };\r\n\r\n\r\nBasically, I redefine target method, in previous test case, redefining getFullName method by wrapping it inside callback function and call it after aspect is passed, or it will never get called if aspect fails.\r\n\r\nWe can test async cases. Using ajax to validate a user is common practice in any ajax heavy application or single page apps.\r\n\r\nHere is the test code:\r\n\r\n    var authenticateAspect = function (error, success, context, args) {\r\n            logger.log(\'authenticate (applyBefore async) aspect is being called\');\r\n            var request = $.ajax({\r\n                url: \"http://localhost/BlogWeb/api/user/authenticate\",\r\n                type: \"GET\",\r\n                data: { username:\'jeff\', pwd:\'jeff\' },\r\n                success: function (data) {\r\n                    if (data) {\r\n                        success();\r\n                    } else {\r\n                        error();\r\n                    }\r\n                },\r\n                error: error\r\n            });\r\n            return request;\r\n        };\r\n\r\n        Person.applyBefore(authenticateAspect, \'sendNotification\');\r\n\r\n        var p1 = new Person();\r\n\r\n        p1.sendNotification();\r\n\r\nBefore sending an notification, I would like to check if the user is authenticated or not. Assuming the ajax call returns true or false, I would like to continue sending email or throw error and stop sending email. Since the original method body(sendNotification) is only called inside success callback function, we can make sure no email is sent if the ajax call returns false.\r\n\r\nSimilarly, we can implement applyAfter extension to make the aspect executed at the end of method call to do something with the execution result of that method.\r\nComplete source code is available at [my github][2]\r\nand [more tests][3]\r\n\r\nHappy JS coding!\r\n\r\n\r\n  [1]: http://www.dotvoid.com/2005/06/aspect-oriented-programming-and-javascript/\r\n  [2]: https://github.com/JeffJin/webblog2012/blob/master/BlogWeb.Spa/libs/custom/aspects.js\r\n  [3]: https://github.com/JeffJin/webblog2012/blob/master/BlogWeb.Spa/jstests/aspect.test.js',
      comments: [comments[2], comments[3]]
   });
   posts.push({
      createdOn: new Date(2013, 1, 11, 9, 0, 0, 0),
      updatedOn: new Date(2013, 2, 21, 13, 0, 0, 0),
      createdBy: 'Jeff Jin',
      updatedBy: 'Administrator',
      topic: 'Javascript Pitfalls',
      urlLink: 'javascript-pitfalls',
      status: 'public',
      disableComment: true,
      summary: 'A list of potential areas where .net or Java developers easily make mistakes in Javascript programming.',
      body: '1. **parseInt**\r\n\r\n    This function takes one or two parameters, and the second param is used as base for the conversion.\r\n    parseInt(\'231\', 10)  =>  231\r\n\r\n    parseInt(\'011\', 10)  =>  11\r\n\r\n    These are very obvious and you may say why we can simply remove the second param.\r\n    \r\n    Unexpected thing may happen when we remove the second param.\r\n\r\n    parseInt(\'231\') => 231, as expected.\r\n    \r\n    parseInt(\'011\') => 9 (in Firefox) => 11 (in Chrome)\r\n\r\n    Apparently, FireFox interprets \"010\" as octal due to the leading 0, but chrome does not.\r\n\r\n    To avoid these situations, it\'s best to always use the base number as second param.\r\n\r\n\r\n 2. **var**\r\n\r\n    var notype;\r\n    var name = \"apple\";\r\n\r\n    The type for *notype* is *undefined*, which evaluates to false in condition checking as null and 0.\r\n\r\n 3. **Scope**\r\n\r\n    In Javacript, blocks do not have scope, only function does.\r\n\r\n        function checkname(n){\r\n        var name = n;\r\n    \r\n        if(name === \"apple\")\r\n        {\r\n            var blockname = name;\r\n        }\r\n        \r\n        return blockname;\r\n    }\r\n\r\n    blockname is visible to entire function checkname.\r\n\r\n 4. **Automatic Conversions**\r\n\r\n 5. **&& and ||**\r\n\r\n 6. **Object literal syntax**\r\n\r\n 7. **array.length**\r\n\r\n 8. **prototype**\r\n\r\n 9. **Inner function**\r\n\r\n 10. **Closure**\r\n\r\n',
      comments: [comments[4], comments[5]]
   });
   posts.push({
      createdOn: new Date(2010, 12, 11, 10, 0, 0, 0),
      updatedOn: new Date(2011, 1, 21, 13, 0, 0, 0),
      createdBy: 'Jeff Jin',
      updatedBy: 'Administrator',
      topic: 'Will JavaScript be universal?',
      urlLink: 'javascript-universal',
      status: 'draft',
      disableComment: true,
      summary: 'With JavaScript based apps are getting more and more popular, will it become universal programming language?',
      body: 'Since then, Java and C# started getting more and more popular, and many developers stayed away from C++/C. That probably is why now those C/C++ developers are paid very well, but those languages never become the universal programming language, although they are capable of being it.\r\n\r\nRecently, with the popularity of mobile applications, many developers use their spare time to learn and write applications on iOS, Android and Windows Phone 7/8, dreaming to have their own Angry Bird like apps and retire early. :-)\r\n\r\nQuickly developers run into a problem of duplicating code base for exactly same apps on iOS with Objective C, on android with Java and on windows phone with Xaml and C#.\r\n\r\nDoes it worth to spend much time learning C(Objective one) or Java for .Net developer?\r\n\r\nI would love to learn every language out there, but if I have limited time and resource, I would spend that time on JavaScript and HTML5, which would(hopefully) run on any modern browser, especially on mobile platform. One may argue that apps on browser will never be run the same way as native apps and I agree. \r\n\r\nHowever, a lot of native apps, especially business apps, they never utilize any native app features such as graphic resource, camera and so on and they are best candidate to be implemented in browser.\r\n\r\nWith the rise of many JavaScript libraries, both on client side and server side, such as jQuery, Backbone, Knockout, Angular, Amplify, NodeJS and even latest windows 8 app library, I feel like JavaScript is the mostly spread language in the future, if it is not already there.\r\n\r\nFor a long while, I am lost in many to-be-learned languages, Ruby, ObjectiveC, F#, Java with Android, but now I decided t go deep with JavaScript first, which I started to love a lot.',
      comments: [comments[6], comments[7], comments[8], comments[9]]
   });
   exports.posts = posts;
   exports.comments = comments;
   exports.images = images;
})(window);