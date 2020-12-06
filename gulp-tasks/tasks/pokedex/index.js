'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pump = require('pump');
var replace = require('gulp-replace');

var task = function(cb) {
    var Pokedex = 'src/js/components/pokedex.js';

    // Pokedex
    pump([
            gulp.src([
                Pokedex
            ]),

            concat('pokedex.js'),
            uglify(),
            replace(/ {2,}/g, ''),
            gulp.dest('public/assets/js/components/')
        ],
        cb
    );

    // Pokedex CSS
    var PokedexScss = 'src/scss/components/pokedex.scss';
    pump([
            gulp.src([
                PokedexScss
            ]),
            sass({outputStyle: 'compressed'}).on('error', sass.logError),
            concat('pokedex.css'),
            replace(/\n/g, ''),
            gulp.dest('public/assets/css/components/')
        ],
        cb
    );

};

task.displayName = 'POKEDEX COMPONENT';
task.watchSrc = [
    'src/js/components/pokedex.js',
    'src/scss/components/**/**'
];

module.exports = { task };