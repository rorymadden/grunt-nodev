var fs = require('fs'),
should = require('should');

describe('When the ignoredFiles is removed after being present', function() {
  it('the .nodevignore file is removed', function() {
    var exists = fs.existsSync('.nodevignore');
    exists.should.beFalsy;
  });
});
