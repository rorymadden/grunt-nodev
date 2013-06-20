/*
 * grunt-nodev
 * https://github.com/rorymadden/grunt-nodev
 *
 * Copyright (c) 2013 Rory Madden
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('nodev', 'Starts a nodev server.', function () {

    var command = [__dirname + '/../node_modules/nodev/nodev'];
    var options = this.options();
    var done = this.async();
    var nodevignoreMessage = '# Generated by grunt-nodev';

    if (options.exec) {
      command.push('--exec');
      command.push(options.exec);
    }

    if (options.delayTime) {
      command.push('--delay')
      command.push(options.delayTime);
    }

    if (options.ignoredFiles) {
      var fileContent = nodevignoreMessage + '\n';
      options.ignoredFiles.forEach(function (ignoredGlob) {
        fileContent += ignoredGlob + '\n';
      });
      grunt.file.write('.nodevignore', fileContent);
    }
    // else if (grunt.file.exists('.nodevignore') && grunt.file.read('.nodevignore').indexOf(nodevignoreMessage) === 0){
    //   grunt.file.delete('.nodevignore');
    // }

    if (options.watchedFolders) {
      options.watchedFolders.forEach(function (folder) {
        command.push('--watch');
        command.push(folder);
      });
    }

    if (options.watchedExtensions) {
      command.push('-e');
      var extensionList = '';
      options.watchedExtensions.forEach(function (extensions) {
        extensionList += extensions + ','
      });
      command.push(extensionList.slice(0, -1));
    }

    if (options.debug) command.push('--debug');

    if (options.file) command.push(options.file);

    if (options.args) {
      options.args.forEach(function (arg) {
        command.push(arg);
      });
    }

    grunt.util.spawn({
      cmd: 'node',
      args: command,
      opts: {
        stdio: 'inherit'
      }
    },
    function (error, result) {
      if (error) {
        grunt.log.error(result.stderr);
        done(false);
      }
      grunt.log.writeln(result.stdout);
      done();
    });
  });

}
