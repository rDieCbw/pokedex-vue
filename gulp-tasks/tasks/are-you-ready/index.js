'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pump = require('pump');
var replace = require('gulp-replace');

var task = function(cb) {
    var areYouReady = 'src/js/are-you-ready/rur-dev.js';

    // Pronto
    pump([
            gulp.src([
                areYouReady
            ]),

            concat('rur.js'),
            uglify(),
            replace(/ {2,}/g, ''),
            gulp.dest('public/assets/js/')
        ],
        cb
    );

};

task.displayName = 'Are You Ready';
task.watchSrc = [
    'src/js/are-you-ready/rur-dev.js'
];

module.exports = { task };