'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ZarizGenerator = module.exports = function ZarizGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ZarizGenerator, yeoman.generators.Base);

/**
 * Ask for the Drupal host.
 */
ZarizGenerator.prototype.askForDrupalHost = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'drupalHost',
    message: 'What is your Drupal installation host? You may include the port number.',
    default: 'http://localhost'
  }];

  this.prompt(prompts, function (props) {
    this.drupalHost = props.drupalHost;

    cb();
  }.bind(this));
};

/**
 * Ask for the Drupal domain.
 */
ZarizGenerator.prototype.askForDrupalDomain = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'drupalDomain',
    message: 'What is your domain?',
    default: 'drupal'
  }];

  this.prompt(prompts, function (props) {
    this.drupalDomain = props.drupalDomain;

    cb();
  }.bind(this));
};

/**
 * Get the Drupal theme name.
 */
ZarizGenerator.prototype.askForDrupalTheme = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'drupalTheme',
    message: 'What is your theme name?',
    default: 'zrizi'
  }];

  this.prompt(prompts, function (props) {
    this.drupalTheme = props.drupalTheme;

    cb();
  }.bind(this));
};

/**
 * Get the static site's base path.
 */
ZarizGenerator.prototype.askForBasePath = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'basePath',
    message: 'What is the static site base path? For example if you host your site on example.github.io/your-site, then the base path should be "your-site". Otherwise, if you host your site on example.com, leave this blank.',
    default: ''
  }];

  this.prompt(prompts, function (props) {
    this.basePath = props.basePath;

    cb();
  }.bind(this));
};

ZarizGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

ZarizGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};