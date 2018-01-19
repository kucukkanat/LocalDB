const gulp = require('gulp')
const path = require('path')
const build = require('./tasks/build.js')
const webserver = require('./tasks/webserver.js')
const webpack = require('webpack-stream')


gulp.task('build', build)
gulp.task('webserver', webserver);


gulp.task('dev', gulp.parallel('webserver', 'build', function watch() {
  gulp.watch('src/**/*.js', gulp.parallel('build'))
}))