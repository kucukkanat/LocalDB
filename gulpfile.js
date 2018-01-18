const gulp = require('gulp')
const path = require('path')
const build = require('./tasks/build.js')
const webserver = require('./tasks/webserver.js')
const webpack = require('webpack-stream')


gulp.task('build', build)
gulp.task('webserver', webserver);


gulp.task('build:example', (done) => {
  return gulp.src('src/index.js')
    .pipe(webpack({
      entry: {
        app: ["./example/index.js"]
      },
      output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist",
        filename: "[name].js",
        library: 'localdb',
        libraryTarget: 'umd'
      },
      devtool: 'source-map'
    }))
    .pipe(gulp.dest('example/dist/'))
  done()
})

gulp.task('dev', gulp.parallel('webserver', 'build', function watch() {
  gulp.watch('src/**/*.js', gulp.parallel('build'))
  gulp.watch('example/index.js', gulp.parallel('build'))
}))