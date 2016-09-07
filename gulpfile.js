
/**
 * Gulpfile for meels recipe book project
 */

'use strict';

/* ************************************************************************** */

/* GULP CONFIG */

/* Dependencies */

// gulp itself
var gulp = require('gulp');

// utilities
var fs = require('fs');
var shell = require('gulp-shell');

// css
var sass = require('gulp-sass');

// js
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

// compilation utilities
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');

// helpers
var watch = require('gulp-watch');

// server
var spawn = require('child_process').spawn;

/* ************************************************************************** */

/* Variables */
var node;
var filePaths = {
    serverConfig: 'server/server.js'
}

/* ************************************************************************** */

/* SERVER */

gulp.task('start-server', function() {
    gulp.start('kill-server');
    node = spawn('node', [filePaths.serverConfig], {stdio: 'inherit'});
    node.on('close', function(code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('kill-server', function() {
    if (node) node.kill();
});

gulp.task('kill-server-process', shell.task([
    'killall node'
]));

/* ************************************************************************** */

/* CSS */

/**
 * Task to compile Sass
 */
gulp.task('sass', function() {
    return gulp.src('./app/src/css/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                'node_modules/foundation-sites/scss'
            ],
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/dist/css'));
});

/* ************************************************************************** */

/* JS */

// to add source maps

gulp.task("js", ['eslint'], function () {
  browserify("app/src/js/app.js")
    .transform('babelify', {presets: ["es2015", "react"]})
    .bundle()
    .pipe(fs.createWriteStream("app/dist/js/app.js"));
});

// es2015 linting
gulp.task('eslint', function() {
    return gulp.src(['app/src/js/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});

/* ************************************************************************** */

/* PROCESSING */

/**
 * Task to watch for changes in files and trigger events
 */
gulp.task('watch', function() {

    // watch for css changes
    watch(['app/src/css/**/*.scss'], function() {
        gulp.start('sass');
    });

    // watch for js changes
    watch(['app/src/js/**/*.js'], function() {
        gulp.start('js');
    });

    // watch for server config changes
    watch([filePaths.serverConfig], function() {
        gulp.start('start-server');
    });

    // start app server
    gulp.start('start-server');
});

/*
    Task to force kill all node processes and start the watch
 */
gulp.task('force-watch', ['kill-server-process'], function() {
    gulp.start('watch');
});

/* ************************************************************************** */
