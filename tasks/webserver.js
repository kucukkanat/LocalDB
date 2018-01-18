const gulp = require('gulp')
const webserver = require('gulp-webserver')
const PORT = 8080
const path = require('path')
module.exports = function (done) {
    gulp.src('./dist')
        .pipe(webserver({
            port: PORT,
            livereload: true,
            directoryListing: false,
            open: false
        }))
}