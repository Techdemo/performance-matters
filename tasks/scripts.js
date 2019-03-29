const gulp = require('gulp');
const concat = require('gulp-concat')
const uglify = require('gulp-uglify');
const baseDir = '../public/javascripts/'
const pipeline = require('readable-stream').pipeline;
const rename = require("gulp-rename");

gulp.task('min-js', function () {
    return gulp.src('./public/javascripts/client.js')
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename += "-min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('public/js'))
})

