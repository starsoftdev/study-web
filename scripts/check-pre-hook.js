/* eslint-disable */
var fs = require('fs');
var path = require('path');

var repoPath = path.resolve('./.git');
var hookPath = path.resolve('./.git/hooks/pre-commit');

fs.lstat(repoPath, function(err, stats) {
  if (err) {
    console.log('repo directory not present, skipping hook');
  } else {
    fs.lstat(hookPath, function(err, stats) {
      if (err) {
        //File does not exist
        //It means it is the First time running the scripts
        fs.chmodSync('./scripts/pre-commit', '755');
        fs.symlinkSync(path.resolve('./scripts/pre-commit'), hookPath);
      }
    });
  }
});
/* eslint-enable */
