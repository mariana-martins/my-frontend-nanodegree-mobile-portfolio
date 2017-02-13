var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var imageMin = require('gulp-imagemin');
var cache = require('gulp-cache');
gulp.task('css',function(){
    gulp.src(['src/styles/**/*.css'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(cssComb())
        .pipe(cmq({log:true}))
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/styles'))
        .pipe(reload())
});
gulp.task('js',function(){
    gulp.src(['src/scripts/**/*.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(reload())
});
gulp.task('html',function(){
    gulp.src(['src/**/*.html'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist'))
        .pipe(reload())
});
gulp.task('image',function(){
    gulp.src(['src/images/**/*'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(cache(imageMin()))
        .pipe(gulp.dest('dist/images'))
        .pipe(reload())
});
gulp.task('default',function(){
    browserSync.init({
        server: "src", port:8080
    });
    gulp.watch('src/scripts/**/*.js',['js']);
    gulp.watch('src/styles/**/*.css',['css']);
    gulp.watch('src/**/*.html',['html']);
    gulp.watch('src/images/**/*',['image']);
});
