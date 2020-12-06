'use strict';
 
var gulp = require('gulp');
var lodash = require('lodash');

var gulpBuildObject = require('./gulp-tasks/tasks');
//tasks functions sources for app sources
if(gulpBuildObject.length > 0){  
  exports.app_tasks = gulp.series(gulpBuildObject);
}

// //everything
exports.all = gulp.series(gulpBuildObject);
exports.watch = () => {
  gulpBuildObject.forEach(task => {
    if(task.watchSrc) {
      gulp.watch(task.watchSrc, lodash.debounce(gulp.series(task), 1000))
    }
  })
};
