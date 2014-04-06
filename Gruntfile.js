module.exports = function(grunt) {
   var fileList = [
      "client/app/lib/jshash/md5-min.js",
      "client/app/lib/marked.min.js",
      "client/app/lib/prettify.js",
      "client/app/lib/lodash.underscore.min.js",
      "client/app/lib/jquery.min.js",
      "client/app/lib/amplify.min.js",
      "client/app/lib/angular/angular.min.js",
      "client/app/lib/angular/angular-cookies.min.js",
      "client/app/lib/angular/angular-loader.min.js",
      "client/app/lib/angular/angular-touch.min.js",
      "client/app/lib/angular/angular-route.min.js",
      "client/app/lib/angular/angular-animate.min.js",
      "client/app/lib/angular/angular-sanitize.min.js",
      "client/app/lib/moment.min.js",
      "client/app/lib/Markdown.Converter.min.js",
      "client/app/lib/Markdown.Sanitizer.min.js" ,
      "client/app/lib/Markdown.Editor.min.js"];

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
         },
         app: {
            src: ['client/app/app.js'],
            dest: 'client/build/ngmin/app.js'
         }
      },
      concat: {
         options: {
            stripBanners: true,
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
               '<%= grunt.template.today("yyyy-mm-dd") %> */',
            separator: ';'
         },
         app: {
            src: ['client/build/ngmin/bootstrap.js',
               'client/build/ngmin/providers.js',
               'client/build/ngmin/services.js',
               'client/build/ngmin/filters.js',
               'client/build/ngmin/directives.js',
               'client/build/ngmin/controllers.js',
               'client/build/ngmin/app.js'],
            dest: 'client/build/blog.js'
         },
         lib: {
            src: fileList,
            dest: 'client/build/lib.js'
         }
      },
      uglify: {
         options: {
            mangle: false
         },
         app: {
            src: 'client/build/blog.js',
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
         all: ['client/app/js/**/*.js'],
         // run karma in the background
         options: {multistr: true}
      },
      nodemon: {
         dev: {
            script: 'webserver.js'
         }
      }
   });

// Load the plugins that provides the following tasks.
   grunt.loadNpmTasks('grunt-ngmin');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-karma');
   grunt.loadNpmTasks('grunt-nodemon');
   //grunt.loadNpmTasks('grunt-execute');

// Default task(s).
   grunt.registerTask('default', ['karma']);
   grunt.registerTask('image-resize', 'Resize images into different resolutions and put them into corresponding folders',
         function(){
            grunt.util.spawn({
               cmd: 'node',
               args: ['server/test/resize-images.js']
            });
            //grunt.task.run('watch');
         });

};
