'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pump = require('pump');
var replace = require('gulp-replace');

var task = function(cb) {
    // Pokedex CSS
    var AppScss = 'src/scss/app.scss';
    pump([
            gulp.src([
                AppScss
            ]),
            sass({outputStyle: 'compressed'}).on('error', sass.logError),
            concat('app.css'),
            replace(/\n/g, ''),
            gulp.dest('public/assets/css/')
        ],
        cb
    );

};

task.displayName = 'APP PAGE';
task.watchSrc = [
    'src/scss/**/*.*'
];

module.exports = { task };