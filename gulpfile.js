'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');

gulp.task('scss', () => {
  gulp.src('./scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('assets/css'));
});

gulp.task('webpack', () => {
  gulp.src('./js/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('default', ['scss', 'webpack']);

gulp.task('watch', () => {
  gulp.watch([
    './scss/*.scss',
    './js/*.js'
  ], ['default']);
});
