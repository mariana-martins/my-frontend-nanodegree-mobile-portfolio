var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var inlineCss = require('gulp-inline-css');

gulp.task('default', function() {
    browserSync.init({
        server: "src"
    });
    gulp.watch("src/**/*").on('change', browserSync.reload);
});

gulp.task('minify-js', function () {
    gulp.src(['src/scripts/**/*.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('minify-html', function() {
    gulp.src(['src/**/*.html'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(inlineCss())
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-images', function() {
    gulp.src(['src/images/**/*'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('uncompress', function () {
    return gulp.src('./compressed/*.gz')
        .pipe(gunzip())
        .pipe(gulp.dest('./uncompressed'))
});

gulp.task('minify', ['minify-js', 'minify-html', 'minify-images']);