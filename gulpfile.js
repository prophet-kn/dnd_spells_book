var gulp = require('gulp')
var sass = require('gulp-sass')
var bulkSass = require('gulp-sass-bulk-import')
var cssDest = './src/'
var scssSrc = './src/App.scss'
var output = 'compressed'
 
sass.compiler = require('node-sass')
 
gulp.task('sass', function () {
  return gulp.src(scssSrc)
    .pipe(bulkSass())
    .pipe(sass({
      outputStyle: output,
      precision: 10,
      includePaths: ['./src'],
    }))
    .on('error', sass.logError)
    .pipe(gulp.dest(cssDest))
})
 
gulp.task('sass:watch', gulp.series(['sass'], function() {
  gulp.watch(scssSrc, gulp.series(['sass']))
}))

gulp.task('default', gulp.parallel(['sass:watch']))
