/// <binding Clean='clean' />

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  fs = require("fs");

var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');

var paths = {
    bower: "./bower_components/",
    lib: "./lib/",
    configScript: "./cisapp/",
    fmConfigScript: "./fmapp/"
};

var allJsPaths = [
    paths.configScript + "common/util.js",
    paths.configScript + "common/factory.js",
    paths.configScript + "common/core.js",
    paths.configScript + "config/**/*.js"
];

//压缩站点css
//合并公用js
gulp.task('cisappallscripts', function () {
    return gulp.src(allJsPaths)
        .pipe(concat('cisapp.all.js'))
        .pipe(gulp.dest(paths.configScript + 'build/'));
});
//压缩公用js
gulp.task('cisappallminscripts', function () {
    return gulp.src(allJsPaths)
        .pipe(uglify())
        .pipe(concat('cisapp.all.min.js'))
        .pipe(gulp.dest(paths.configScript + 'build/'));
});

gulp.task("min", ['cisappallscripts', 'cisappallminscripts']);

var watchPaths = allJsPaths.concat("./css/site.css");


gulp.task('default', ['cisappallscripts', 'cisappallminscripts'], function () {
    gulp.watch(watchPaths, ['default']);
});