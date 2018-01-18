const gulp = require('gulp')
const webpack = require('webpack-stream')
const path = require('path')
module.exports = function () {
    return gulp.src('src/index.js')
        .pipe(webpack({
            entry: {
                release: "./src/index.js"
            },
            output: {
                filename: "[name].js",
                library: 'localdb',
                libraryTarget: 'umd'
            },
            module: {
                rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                }]
            },
            devtool: 'source-map'
        }))
        .pipe(gulp.dest('dist/'))
}