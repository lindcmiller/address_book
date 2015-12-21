var gulp = require('gulp');
var del = require('del');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');

// Define a few paths which will be useful to us later on
var paths = {
  app: 'app',
  compilePath: 'dist/',
  html: 'app/**/*.html',
  js: 'app/**/*.js',
  css: 'app/**/*.css',
  dependencies: [
    'node_modules/angular/angular.js',
    'node_modules/angular-ui-router/build/angular-ui-router.js'
  ]
};

// Default gulp task
gulp.task('default', ['serve']);

// Cleans the compiled folder
gulp.task('clean', function(callback) {
  var pathsToDelete = [paths.compilePath + '**'];
  return del(pathsToDelete, callback);
});

// Copies our JavaScript files into the dist folder so that
// they can be served up
gulp.task('js', function() {
  gulp
    .src(paths.js)
    .pipe(gulp.dest(paths.compilePath))
    .pipe(connect.reload());
});

// Copies our HTML files into the dist folder so that
// they can be served up
gulp.task('html', function () {
  gulp
    .src(paths.html)
    .pipe(gulp.dest(paths.compilePath))
    .pipe(connect.reload());
});

// Copies our CSS files into the dist folder so that
// they can be served up
gulp.task('css', function () {
  gulp
    .src(paths.css)
    .pipe(gulp.dest(paths.compilePath))
    .pipe(connect.reload());
});


// Copies vendor files into the dist folder
gulp.task('copy:vendor', function() {
  gulp
    .src(paths.dependencies)
    .pipe(gulp.dest(paths.compilePath));
});

// "Compiles" the app. Since this app is pretty simple, we're mostly just
// emptying the contents of a folder and copying over a bunch of files
gulp.task('compile', function(callback) {
  runSequence('clean', ['html', 'js', 'css', 'copy:vendor'], callback);
});

// Watches specific files in the app folder for changes
// and auto-reloads the browser when they've changed
gulp.task('watch', function () {
  gulp.watch([paths.html], ['html']);
  gulp.watch([paths.js], ['js']);
  gulp.watch([paths.css], ['css']);
});

// Serves up the files
gulp.task('serve', ['compile', 'watch'], function() {
  connect.server({
    root: paths.compilePath,
    livereload: true
  });
});
