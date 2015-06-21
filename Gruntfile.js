module.exports = function(grunt) {
  var JS_SRC_PATH = 'src/js/weather-widget.js',
      JS_DIST_PATH = 'dist/js/weather-widget.min.js',
      CSS_SRC_PATH = 'src/css/weather-widget.css',
      CSS_DIST_PATH = 'dist/css/weather-widget.min.css',
      HTML_SRC_PATH = 'src/templates/weather-widget.tpl.html',
      HTML_DIST_PATH = 'dist/templates/weather-widget.tpl.min.html';

  grunt.initConfig({
    uglify: {
      dist: {
        src: JS_SRC_PATH,
        dist: JS_DIST_PATH
      } 
    },
    cssmin: {
      dist: {
        src: CSS_SRC_PATH,
        dist: CSS_DIST_PATH
      }
    },
    htmlmin: {                                     
      dist: {                                      
        options: {                                 
          removeComments: true,
          collapseWhitespace: true
        },                               
        src: HTML_SRC_PATH,
        dist: HTML_DIST_PATH
      }
    },
    copy: {
      dist: {
        expand: true,
        cwd: 'src/fonts',
        src: '*',
        dist: 'dist/fonts/'
      }
    },
    connect: {
      serve: {
        options: {
          livereload: true
        }
      }
    },
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      css: {
        files: CSS_SRC_PATH,
        tasks: 'cssmin'
      },
      js: {
        files: JS_SRC_PATH,
        tasks: 'uglify'
      },
      html: {
        files: HTML_SRC_PATH,
        tasks: 'htmlmin'
      }
    },
    clean: {
      dist: 'dist/**/*'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['clean', 'copy', 'htmlmin', 'cssmin', 'uglify']);
  grunt.registerTask('serve', ['build', 'connect', 'watch']);

  grunt.registerTask('default', ['build']);

};
