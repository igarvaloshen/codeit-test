var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var concat = require('gulp-concat');

gulp.task('minify', function () {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
}))
});
gulp.task('minify-css', function () {
    return gulp.src('app/css/*.css')
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));
});
gulp.task('concat', function() {
    return gulp.src('dist/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js/'));
});
gulp.task('watch', ['browserSync', 'sass', 'minify', 'minify-css'], function (){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/css/**/*.css', browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
gulp.task('browserSync', function() {
    browserSync({
        server: {
        baseDir: 'app'
    }
});
});
