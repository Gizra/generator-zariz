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
  var request = require('request');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist',
      stage: 'stage',
      // Zariz related variables.
      drupalHost: '<%= drupalHost %>',
      drupalDomain: '<%= drupalDomain %>',
      drupalSite: '<%%= yeoman.drupalHost %>/<%%= yeoman.drupalDomain %>',
      drupalMasterBranch: '<%= drupalMasterBranch %>',
      basePath: '<%= basePath %>'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['{.tmp,<%%= yeoman.app %>}/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all']
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
      stage: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.stage %>/*',
            '!<%%= yeoman.stage %>/.git*'
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
      html: '<%%= yeoman.stage %>/index.html',
      options: {
        dest: '<%%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%%= yeoman.dist %>/**/*.html'],
      css: ['<%%= yeoman.dist %>/styles/**/*.css'],
      options: {
        assetsDirs: ['<%%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.stage %>/assets',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%%= yeoman.dist %>/assets'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.stage %>/assets',
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
          cwd: '<%%= yeoman.stage %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%%= yeoman.dist %>'
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
          cwd: '<%%= yeoman.stage %>',
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
      stage: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.stage %>',
          dest: '<%%= yeoman.app %>',
          src: [
            '*',
            '**/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/assets',
          dest: '<%%= yeoman.stage %>/assets',
          src: [
            'generated/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%%= yeoman.stage %>/styles',
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

    'curl-dir': {
      stylesStage: {
        // "src" will be populated on the fly in the "getAssetsFromHtml" task.
        src: [],
        dest: '<%%= yeoman.stage %>/styles'
      },
      scriptsStage: {
        // "src" will be populated on the fly in the "getAssetsFromHtml" task.
        src: [],
        dest: '<%%= yeoman.stage %>/scripts'
      },
      imagesStage: {
        // "src" will be populated on the fly in the "getAssetsFromHtml" task.
        src: [],
        dest: '<%%= yeoman.stage %>/assets'
      },
      getAssetsFromHtml: {
        // "src" will be populated on the fly in the "getAssetsFromHtml" task.
        src: [],
        router: function (url) {
          // Remove query string from the file name (e.g. foo.jpg?token=1234).
          url = url.replace(/\?.*/g, '');
          // Remove the Drupal site, and "sites/default/files" from the file name.
          return url.replace(/http:.*?\/sites\/default\/files/g, '');
        },
        dest: '<%%= getAssetsFromHtml.stage.dest %>'
      }
    },
    replace: {
      stage: {
        src: ['<%%= yeoman.stage %>/**/*.html'],
        // Overwrite matched source files
        overwrite: true,
        replacements: [
          // <link type="css/text" href="http://example.com/sites/all/modules/foo.css" ...
          {
            from: '<link type="text/css" rel="stylesheet" href="<%%= yeoman.drupalSite %>',
            to: '<link type="text/css" rel="stylesheet" href="/styles'
          },
          // http://example.com/live/
          {
            from: '<%%= yeoman.drupalSite %>/<%%= yeoman.drupalMasterBranch %>/',
            to: '<%%= yeoman.basePath %>/'
          },
          // @todo: Change this hack as it should work also for: /modules,
          // /sites/all/modules, /sites/all/themes
          // Issue is how to inject drupalSite variable without hardcoding.

          // http://example.com/themes => /assets/themes
          {
            from: '<%%= yeoman.drupalSite %>/themes/',
            to: '<%%= yeoman.basePath %>/assets/themes/'
          },
          // <script type="text/javascript" src="http://example.com/misc/jquery.js
          {
            from: '<script type="text/javascript" src="<%%= yeoman.drupalSite %>/',
            to: '<script type="text/javascript" src="<%%= yeoman.drupalSite %>/scripts/'
          },
          // http://example.com/
          {
            from: '<%%= yeoman.drupalSite %>/',
            to: '<%%= yeoman.basePath %>/'
          },
          // /example.com/live/
          {
            from: '/<%%= yeoman.drupalDomain %>/<%%= yeoman.drupalMasterBranch %>/',
            to: '<%%= yeoman.basePath %>/'
          },
          // /example.com/
          {
            from: '/<%%= yeoman.drupalDomain %>/',
            to: '<%%= yeoman.basePath %>/'
          },
          // href="/live"
          {
            from: 'href="/<%%= yeoman.drupalMasterBranch %>"',
            to: 'href="<%%= yeoman.basePath %>/"'
          },
          {
            from: /sites\/default\/files\/.*?"/g,
            to: function(value) {
              value = value.replace(/\?.*/g, '');
              // @todo: Improve logic.
              value = value + '"';
              return value;
            }
          },
          {
            from: '/sites/default/files/',
            to: '<%%= yeoman.basePath %>/assets/'
          }
        ]
      }
    },
    getHtml: {
      stage: {
        drupalSite: '<%%= yeoman.drupalSite %>',
        dest: '<%%= yeoman.stage %>'
      }
    },
    getAssetsFromHtml: {
      stage: {
        src: '<%%= yeoman.stage %>/**/*.html',
        dest: '<%%= yeoman.stage %>/assets'
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
    // Task is asynchronous.
    var done = this.async(),
      drupalSite = this.data.drupalSite,
      self = this;


    request(drupalSite + '/zariz-pages', function (error, response, body) {
      if (error || response.statusCode !== 200) {
        grunt.fail.fatal('Error contacting Drupal site.');
      }

      var data = JSON.parse(body),
        config = grunt.config.get('curl') || {};

      // Prefix files with the Drupal site path.
      var src = [];
      _.each(data.insert, function(url) {
        src.push(drupalSite + '/' + url);
      });

      var config = grunt.config.get('curl-dir') || {};
      config.getHtml = {
        src: src,
        router: function (url) {
          url += url === 'index.php' ? 'index.html' : '/index.html';
          return url.replace(drupalSite, '').replace('index.php', '');
        },
        dest: self.data.dest
      };

      grunt.config.set('curl-dir', config);
      grunt.task.run(['curl-dir:getHtml']);

      // Task finished.
      done();
    });
  });

  grunt.registerMultiTask('getAssetsFromHtml', 'Gets files from HTML pages', function() {
    // Get the list of files.
    var sourceFiles = grunt.file.expand(this.data.src),
      drupalSite = grunt.config.get('yeoman.drupalSite'),
      stylesPath = [],
      scriptsPath = [],
      imagesPath = [],
      filesPath = [],
      stylesRegExp = /<link type="text\/css".*?href="(http:\/\/.*?)".*?\/>/g,
      scriptsRegExp = new RegExp('<script type="text\/javascript" src="(' + drupalSite.replace('/', '\/') + '\/.*?)"><\/script>', 'g'),
      imagesRegExp = new RegExp('<img src="(' + drupalSite.replace('/', '\/') + '\/(themes|modules)\/.*?)"', 'g'),
      filesRegExp = /"(http.*?\/sites\/default\/files\/.*?)"/g,
      match;
    sourceFiles.forEach(function (pathToSource) {
      var contents = grunt.file.read(pathToSource);


      // Get CSS files from themes or modules.
      while (match = stylesRegExp.exec(contents)) {
        stylesPath.push(match[1]);
      }

      // Get JS files from themes or modules.
      while (match = scriptsRegExp.exec(contents)) {
        scriptsPath.push(match[1]);
      }


      // Get images from modules and themes.
      while (match = imagesRegExp.exec(contents)) {
        imagesPath.push(match[1]);
      }

      // Get files from sites/default/files.
      while (match = filesRegExp.exec(contents)) {
        filesPath.push(match[1]);
      }
    });


    stylesPath = _.uniq(stylesPath);
    scriptsPath = _.uniq(scriptsPath);
    imagesPath = _.uniq(imagesPath);
    filesPath = _.uniq(filesPath);

    var config = grunt.config.get('curl-dir') || {};
    config.stylesStage.src = [stylesPath];
    config.scriptsStage.src = [scriptsPath];
    config.imagesStage.src = [imagesPath];
    config.getAssetsFromHtml.src = [filesPath];

    // Add "curl-dir" router.
    var router = function (url) {
      // Remove "http://example.com/" from the CSS file name, and query strings.
      var drupalSite = grunt.config.get('yeoman.drupalSite');
      return url.replace(drupalSite, '').replace(/\?.*/g, '');
    };

    config.stylesStage.router = router;
    config.scriptsStage.router = router;
    config.imagesStage.router = router;

    grunt.config.set('curl-dir', config);
    return grunt.task.run([
      'curl-dir:stylesStage',
      'curl-dir:scriptsStage',
      'curl-dir:imagesStage',
      'curl-dir:getAssetsFromHtml'
    ]);
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

  // Get files from the Drupal theme.
  grunt.registerTask('getThemeFiles', [
    'curl-dir:stylesStage',
    'curl-dir:scriptsStage'
  ]);

  grunt.registerTask('stage', [
    'clean:stage',
    'getHtml',
    'getAssetsFromHtml',
    'getThemeFiles',
    'replace:stage',
    'copy:stage'
  ]);

  grunt.registerTask('build', [
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'copy:dist',
    'cdnify',
    'imagemin',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
