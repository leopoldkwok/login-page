"use strict";

// Include gulp
var gulp = require('gulp');
// Include our plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var del = require('del');

gulp.task("concatScripts", function() {
  return gulp.src([ // return is needed otherwise other tasks won't know when the concatScripts tasks are completed
    'js/lib/jquery-1.9.1.min.js',
    'js/script.js'])
  .pipe(maps.init())
  .pipe(concat("app.js")) // concats the files to app.js
  .pipe(maps.write('./'))
  .pipe(gulp.dest("js")); // writes to the js folder
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("js/app.js") // source files to minify
    .pipe(uglify())
    .pipe(rename('app.min.js')) // rename the file being minifed
    .pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
  return gulp.src("scss/application.scss") // find the source files
    .pipe(maps.init()) // where the sass files are compiled
    .pipe(sass())
    .pipe(maps.write('./')) // to live next to the css folder .eg relative to output directory css folder
  .pipe(gulp.dest('css'));
})

gulp.task('watchFiles', function() {
  gulp.watch('scss/**/*.scss', ['compileSass']) // look for a file extension of .scss in the scss folder.
  gulp.watch('js/**/*.js', ['concatScripts']); // splitting the watch scripts and only watching the js/main.js file
})

gulp.task('clean', function() {
  del(['dist', 'css/application.css*','app*.js*']);
})

gulp.task("build", ['minifyScripts', 'compileSass'], function() {
  return gulp.src(["css/application.css", "js/app.min.js", 'index.html'], {base: './'}) // current working directory
    .pipe(gulp.dest('dist')); // goes to folder dist
});

// gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"],function() {
  gulp.start('build');
});
