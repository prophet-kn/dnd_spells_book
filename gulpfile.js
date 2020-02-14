var gulp = require('gulp')
var sass = require('gulp-sass')
var bulkSass = require('gulp-sass-bulk-import')
var concat = require('gulp-concat')
var cssDest = './src/compiled/'
var output = 'compressed'
sass.compiler = require('node-sass')

// Watch all scss changes.
var source = './src/styles'

gulp.task('sass:all', function () {
  return gulp
    .src('./src/styles/compile/_compile.scss')
    .pipe(bulkSass())
    .pipe(concat('theme.css'))
    .pipe(sass({
      outputStyle: output,
      precision: 10,
      includePaths: ['./src/styles/'],
    }))
    .on('error', sass.logError)
    .pipe(gulp.dest(cssDest))
})

gulp.task('sass', gulp.series(['sass:all']))
 
gulp.task('sass:watch', gulp.series(['sass'], function() {
  gulp.watch(source, gulp.series(['sass']))
}))

gulp.task('default', gulp.parallel(['sass:watch']))
