module.exports = function(grunt) {

   // Project configuration.
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      ngmin: {
         controllers: {
            src: ['client/app/js/controllers/**/*.js'],
            dest: 'client/build/ngmin/controllers.js'
         },
         directives: {
            src: ['client/app/js/directives/*.js'],
            dest: 'client/build/ngmin/directives.js'
         },
         filters: {
            src: ['client/app/js/filters/*.js'],
            dest: 'client/build/ngmin/filters.js'
         },
         providers: {
            src: ['client/app/js/providers/*.js'],
            dest: 'client/build/ngmin/providers.js'
         },
         services: {
            src: ['client/app/js/services/**/*.js'],
            dest: 'client/build/ngmin/services.js'
         },
         bootstrap: {
            src: ['client/app/bootstrap.js'],
            dest: 'client/build/ngmin/bootstrap.js'
         }
      },
      uglify: {
         options: {
            mangle: false
         },
         build: {
            src: 'client/build/ngmin/*.js',
            dest: 'client/build/blog.min.js'
         }
      },
      karma: {
         unit: {
            options: {
               files: [
                  "client/app/lib/jshash/md5-min.js",
                  "client/app/lib/marked.js",
                  "client/app/lib/prettify.js",
                  "client/app/lib/lodash.underscore.js",
                  "client/app/lib/underscore.string.js",
                  "client/app/lib/jquery.min.js",
                  "client/app/lib/amplify.js",
                  "node_modules/sinon/pkg/sinon.js",
                  "client/app/lib/angular/angular.js",
                  "client/app/lib/angular/angular-cookies.js",
                  "client/app/lib/angular/angular-loader.js",
                  "client/app/lib/angular/angular-touch.js",
                  "client/app/lib/angular/angular-route.js",
                  "client/app/lib/angular/angular-animate.js",
                  "client/app/lib/angular/angular-sanitize.js",
                  "client/app/lib/angular/angular-mocks.js",
                  "client/app/lib/moment.min.js",
                  "client/app/lib/Markdown.Converter.js",
                  "client/app/lib/Markdown.Sanitizer.js" ,
                  "client/app/lib/Markdown.Editor.js",
                  "client/app/bootstrap.js" ,
                  "client/app/js/directives/*.js",
                  "client/app/js/filters/*.js",
                  "client/app/js/services/*.js",
                  "client/app/js/controllers/*.js",
                  "client/client/app/js/providers/*.js",
                  //test files
                  'client/test/unit/data.js',
                  'client/test/unit/**/*.js'
               ]
            },
            configFile: 'karma.conf.js',
            // run karma in the background
            background: true
         }
      },
      jshint: {
         all: ['client/app/js/**/*.js', 'client/app/js/app.js', 'client/app/js/bootstrap.js'],
         // run karma in the background
         options: {multistr: true}
      }
   });

// Load the plugins that provides the following tasks.
   grunt.loadNpmTasks('grunt-ngmin');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-karma');

// Default task(s).
   grunt.registerTask('default', ['jshint']);

};
