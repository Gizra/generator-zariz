// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var _ = require('underscore');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist',
      // Zariz related variables.
      drupalHost: '<%= drupalHost %>',
      drupalDomain: '<%= drupalDomain %>',
      drupalSite: '<%%= yeoman.drupalHost %>/<%%= yeoman.drupalDomain %>',
      drupalTheme: '<%= drupalTheme %>',
      basePath: '<%= basePath %>'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['{.tmp,<%%= yeoman.app %>}/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all']
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test']
      },
      styles: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%%= yeoman.app %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%%= yeoman.app %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%%= yeoman.dist %>/styles/{,*/}*.css',
            '<%%= yeoman.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%%= yeoman.app %>/index.html',
      options: {
        dest: '<%%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/assets',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%%= yeoman.dist %>/assets'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/assets',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist %>/assets'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          // Optional configurations that you can uncomment to use
          // removeCommentsFromCDATA: true,
          // collapseBooleanAttributes: true,
          // removeAttributeQuotes: true,
          // removeRedundantAttributes: true,
          // useShortDoctype: true,
          // removeEmptyAttributes: true,
          // removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'assets/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/assets',
          dest: '<%%= yeoman.dist %>/assets',
          src: [
            'generated/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    replace: {
      pages: {
        src: ['<%%= yeoman.app %>/**/*.html'],
        // Overwrite matched source files
        overwrite: true,
        replacements: [{
          from: '<%%= yeoman.drupalSite %>/',
          to: '<%%= yeoman.basePath %>'
        }, {
          from: '/<%%= yeoman.drupalDomain %>/',
          to: '<%%= yeoman.basePath %>'
        }, {
          from: /sites\/default\/files\/.*?"/g,
          to: function(value) {
            value = value.replace(/\?.*/g, '');
            // @todo: Improve logic.
            value = value + '"';
            return value;
          }
        }, {
          from: '/sites/default/files/',
          to: '<%%= yeoman.basePath %>assets/'
        }, {
          from: 'sites/all/themes/<%%= yeoman.drupalTheme %>/',
          to: '<%%= yeoman.basePath %>'
        }]
      }
    },
    getHtml: {
      urls: {
        src: [
          'node/1',
          'node/2',
          'node/3',
          'node/4',
          'node/5'
        ]
      }
    },
    getFilesFromHtml: {
      files: {
        src: ['<%%= yeoman.app %>/**/*.html'],
        dest: '<%%= yeoman.app %>/files'
      }
    },
    'gh-pages': {
      options: {
        base: '<%%= yeoman.app %>'
      },
      src: ['**']
    }
  });

  grunt.registerMultiTask('getHtml', 'Get HTML from Drupal', function() {
    // We need to prepare grunt-curl config on the fly based on the given
    // URLs.
    var sourceUrls = this.data.src;
    var urls = [];
    sourceUrls.forEach(function (src) {
      urls.push(grunt.config.get('yeoman.drupalSite') + '/' + src);
    });

    var config = {
      nodes: {
        src: [
          urls
        ],
        router: function (url) {
          url = url + '/index.html';
          return url.replace(grunt.config.get('yeoman.drupalSite'), '');
        },
        dest: grunt.config.get('yeoman.app')
      }
    };

    grunt.config.set('curl-dir', config);
    return grunt.task.run([
      'curl-dir',
      'getFilesFromHtml',
      'replace'
    ]);
  });

  grunt.registerMultiTask('getFilesFromHtml', 'Get files from a single HTML page', function() {
    // Get the list of files.
    var sourceFiles = grunt.file.expand(this.data.src);
    var filePaths = [];
    sourceFiles.forEach(function (pathToSource) {
      var contents = grunt.file.read(pathToSource);

      // Use regex to find files.
      // @todo: Remove hardcoding of "sites/default/files".
      var files = contents.match(/"http.*?\/sites\/default\/files\/.*?"/g);

      if (!files) {
        return;
      }

      files = _.uniq(files);

      files.forEach(function(filePath) {
        filePaths.push(filePath.replace(/\"/g, ''));
      });
    });


    var config = {
      files: {
        src: [
          filePaths
        ],
        router: function (url) {
          url = url.replace(/\?.*/g, '');
          return url.replace(grunt.config.get('yeoman.drupalSite') + '/sites/default/files', '');
        },
        dest: grunt.config.get('yeoman.app') + '/assets'
      }
    };

    grunt.config.set('curl-dir', config);
    return grunt.task.run(['curl-dir']);
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
