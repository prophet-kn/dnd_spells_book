var gulp = require('gulp')
var sass = require('gulp-sass')
var bulkSass = require('gulp-sass-bulk-import')
var autoprefixer = require('gulp-autoprefixer')
var clean = require('gulp-clean-css')
var eslint = require('gulp-eslint');
var sassLint = require('gulp-sass-lint')

var input = 'src/styles'
var output = 'src/compiled'

gulp.task('sass:all', function () {
  return gulp
    .src('./src/styles/theme.scss')
    .pipe(bulkSass())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(clean())
    .pipe(gulp.dest(output))
})

gulp.task('sass', gulp.series(['sass:all']))

gulp.task('sass:watch', gulp.series(['sass'], function() {
  gulp.watch(input, gulp.series(['sass']))
}))

gulp.task('sass:lint', function () {
  return gulp.src(['src/styles/**/*.scss'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('js:lint', function () {
  return gulp.src(['src/components/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', gulp.parallel(['sass:watch']))
