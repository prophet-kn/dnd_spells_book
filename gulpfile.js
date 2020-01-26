var gulp = require('gulp')
var sass = require('gulp-sass')
var bulkSass = require('gulp-sass-bulk-import')
var concat = require('gulp-concat')
var cssDest = './src/'
var output = 'compressed'
sass.compiler = require('node-sass')

// Change this once more themes come.
var finalFile = 'App.css'

// Watch all scss changes.
var source = './src/styles'

var darkSrc = './src/styles/_compile_dark_af.scss'
 
gulp.task('sass', function () {
  return gulp
    .src(darkSrc)
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
  gulp.watch(source, gulp.series(['sass']))
}))

gulp.task('default', gulp.parallel(['sass:watch']))
