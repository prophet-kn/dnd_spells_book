var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require("gulp-autoprefixer");
var concat = require('gulp-concat')
var clean = require('gulp-clean-css')

var cssDest = 'src/compiled'
var output = 'compressed'
//sass.compiler = require('node-sass')

// Watch all scss changes.
var source = './src/styles'

var sassOptions = {
  errLogToConsole: true,
  outputStyle: "nested"
};

var autoprefixerOptions = {
  cascade: false,
  grid: true,
  remove: false
};

gulp.task('sass:all', function () {
  return gulp
    .src('./src/styles/**/*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(clean())
    .pipe(gulp.dest(cssDest))
})

gulp.task('sass', gulp.series(['sass:all']))

gulp.task('sass:watch', gulp.series(['sass'], function() {
  gulp.watch(source, gulp.series(['sass']))
}))

gulp.task('default', gulp.parallel(['sass:watch']))
