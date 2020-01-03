var gulp = require('gulp')
var sass = require('gulp-sass')
var bulkSass = require('gulp-sass-bulk-import')
var concat = require('gulp-concat')
var cssDest = './src/'
var scssSrc = './src/styles/_compile.scss'
var output = 'compressed'
var finalFile = 'App.css'
 
sass.compiler = require('node-sass')
 
gulp.task('sass', function () {
  return gulp
    .src(scssSrc)
    .pipe(bulkSass())
    .pipe(concat(finalFile))
    .pipe(sass({
      outputStyle: output,
      precision: 10,
      includePaths: ['./src/styles/'],
    }))
    .on('error', sass.logError)
    .pipe(gulp.dest(cssDest))
})
 
gulp.task('sass:watch', gulp.series(['sass'], function() {
  gulp.watch(scssSrc, gulp.series(['sass']))
}))

gulp.task('default', gulp.parallel(['sass:watch']))
