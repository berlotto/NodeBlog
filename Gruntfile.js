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
            configFile: 'karma.conf.js',
            // run karma in the background
            background: true,
            // which browsers to run the tests on
            browsers: ['PhantomJS']
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
