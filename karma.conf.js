// Karma configuration
// Generated on Thu Jan 23 2014 21:38:33 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: 'client',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        "app/lib/jshash/md5-min.js",
        "app/lib/marked.js",
        "app/lib/prettify.js",
        "app/lib/lodash.underscore.js",
        "app/lib/underscore.string.js",
        "app/lib/jquery.min.js",
        "app/lib/amplify.js",
        "../node_modules/sinon/pkg/sinon.js",
        "app/lib/angular/angular.js",
        "app/lib/angular/angular-cookies.js",
        "app/lib/angular/angular-loader.js",
        "app/lib/angular/angular-touch.js",
        "app/lib/angular/angular-route.js",
        "app/lib/angular/angular-animate.js",
        "app/lib/angular/angular-sanitize.js",
        "app/lib/angular/angular-mocks.js",
        "app/lib/moment.min.js",
        "app/lib/Markdown.Converter.js",
        "app/lib/Markdown.Sanitizer.js" ,
        "app/lib/Markdown.Editor.js",
        "app/bootstrap.js" ,
        "app/js/directives/*.js",
        "app/js/filters/*.js",
        "app/js/services/*.js",
        "app/js/controllers/*.js",
       "app/js/providers/*.js",

       //test files
        'test/unit/data.js',
        'test/unit/**/*.js'
    ],


    // list of files to exclude
    exclude: [
      
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
