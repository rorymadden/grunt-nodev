# grunt-nodev
> Run [nodev](https://github.com/ericvicenti/nodev) as a grunt task for easy configuration and integration with the rest of your workflow. This is essentially a clone of [grunt-nodemon](https://github.com/ChrisWren/grunt-nodemon) by Chris Wren, however I had difficulties with node-inspector so I edited the package to run nodev instead of nodemon.

[![NPM version](https://badge.fury.io/js/grunt-nodev.png)](http://badge.fury.io/js/grunt-nodev)
## Getting Started
If you haven't used grunt before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a gruntfile as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:
```shell
npm install grunt-nodev --save-dev
```

Then add this line to your project's `Gruntfile.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-nodev');
```

## Documentation

### Usage
The minimal usage of nodev runs with no options:
```js
nodev: {
  dev: {}
}
```
When this is run, nodev will look at the `package.json` file for the `main` property and run its value as a command in node.

Here is a config that uses all of the available options for nodev:

```js
nodev: {
  prod: {
    options: {
      file: 'test/server.js',
      args: ['production'],
      ignoredFiles: ['README.md', 'node_modules/**'],
      watchedExtensions: ['js', 'coffee'],
      watchedFolders: ['test', 'tasks'],
      debug: true,
      delayTime: 1
    }
  },
  exec: {
    options: {
      exec: 'less'
    }
  }
}
```

A common use case is to run `nodev` with other tasks concurrently. This can be achieved with the following config, which uses [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent) to run nodev and [watch](https://github.com/gruntjs/grunt-contrib-watch) in a single terminal tab:
```js
concurrent: {
  target: {
    tasks: ['nodev', 'watch'],
    options: {
      logConcurrentOutput: true
    }
  }
}
```
### Options

#### file
Type: `string`

This is file that nodev runs and restarts when changes are detected.

### args
Type: `Array` of `strings`

This is the list of arguments to be passed to your file.

### ignoredFiles
Type: `Array` of `string globs`

This is a list of ignored files specified by a glob pattern. [Here](https://github.com/remy/nodev#ignoring-files) is an explanation of how to use the patterns to ignore files. This task will create a `.nodevignore` file in your repo based on these settings which nodev reads when it starts.

### watchedExtensions
*** THIS IS NOT WORKING AT PRESENT ***
<!-- Type: `Array` of `strings`

This is a list of file extensions to watch for changes. By default, nodev watches `.js`, `.coffee`, and `.litcoffee` files. -->

### watchedFolders
Type: `Array` of `strings` Default: `'.'`

List of folders to watch for changes if you don't want to watch the root folder and its subdirectories.

### debug
Type: `Boolean`

Optionally launch the node.js debug server.

### delayTime
Type: `Number`

Delay the restart of nodev by a number of seconds when compiling a large amount of files so that the app doesn't needlessly restart after each file.

### exec
Type: `string`

You can use nodev to execute a command outside of node. Use this option to specify a command as a string with the argument being the file parameter above. You can read more on exec [here](https://github.com/remy/nodemon#running-non-node-scripts).

# Changelog

**0.0.0** - Initial release
**0.0.1** - ReadMe update to exclude Watched Extensions

