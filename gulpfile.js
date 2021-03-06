'use strict'

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

gulp.task('browser-sync', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './build'
    }
  });

  gulp.watch('./source/views/**/*.pug', ['html']);
  gulp.watch('./source/scss/**/*.scss', ['css']);
  gulp.watch('./source/js/**/*.js', ['js']);
});

gulp.task('html', function() {
  return gulp.src('./source/views/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./build'))
    .on('end', reload);
});

gulp.task('css', function() {
  return gulp.src('./source/scss/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(prefix())
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('./source/js/**/*.js')
  .pipe(gulp.dest('./build/js'))
  .on('end', reload);
});

gulp.task('default', ['browser-sync', 'html', 'css', 'js']);