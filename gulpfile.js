var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var inlineCss = require('gulp-inline-css');
var smoosher = require('gulp-smoosher');

gulp.task('default', function() {
    browserSync.init({
        server: "src"
    });
    gulp.watch("src/**/*").on('change', browserSync.reload);
});

gulp.task('minify', ['minify-main', 'minify-pizza']);

gulp.task('minify-main', ['minify-main-js', 'minify-main-images', 'minify-main-html']);

gulp.task('minify-main-js', function () {
    gulp.src(['src/scripts/*.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        // uglify js code
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('minify-main-images', function() {
    gulp.src(['src/images/*'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        // minify images
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('minify-main-html', ['minify-main-js', 'minify-main-images'], function() {
    gulp.src(['src/*.html'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        // inject css into dom elements
        .pipe(inlineCss())
        // minify html
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-pizza', ['minify-pizza-js', 'minify-pizza-css', 'minify-pizza-images', 'minify-pizza-html']);

gulp.task('minify-pizza-css', function () {
    return gulp.src(['src/views/styles/*.css'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        // minify css
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/views/styles'));
});

gulp.task('minify-pizza-js', function () {
    return gulp.src(['src/views/scripts/*.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        // uglify js code
        .pipe(uglify())
        .pipe(gulp.dest('dist/views/scripts'));
});

gulp.task('minify-pizza-images', function() {
    gulp.src(['src/views/images/*'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        // minify images
        .pipe(imagemin())
        .pipe(gulp.dest('dist/views/images'));
});

gulp.task('minify-pizza-html', ['minify-pizza-js', 'minify-pizza-css', 'minify-pizza-images'], function() {
    return gulp.src(['src/views/pizza.html'])
        // inject css and js into html file
        .pipe(smoosher({base: 'dist/views'}))
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist/views'));
});
