var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var polybuild = require('polybuild');

var reload = browserSync.reload;

gulp.task('serve', function () {
  browserSync.init({server: {baseDir: "./app/"}});
  gulp.watch("app/elements/**/*.html").on("change", reload);
  gulp.watch("app/index.html").on("change", reload);
});

gulp.task('build', function () {
  return gulp.src('app/index.html')
    .pipe(polybuild({suffix: ''}))
    .pipe(gulp.src('app/bower_components*/font-roboto/fonts/**'))
    .pipe(gulp.dest('./dist'));
});

require('web-component-tester').gulp.init(gulp);

gulp.task('build-watch', ['build'], browserSync.reload);
gulp.task('serve:dist', ['build'], function () {
  browserSync.init({server: {baseDir: "./dist/"}});
  gulp.watch("app/elements/**/*.html", ['build']);
  gulp.watch("app/index.html", ['build']);
});

