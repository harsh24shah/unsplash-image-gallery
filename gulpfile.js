'use strict';

const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const sass = require('gulp-sass');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
sass.compiler = require('node-sass');
const runTimestamp = Math.round(Date.now() / 1000);
const fontName = 'Icons';

gulp.task('iconfont', () => {
  return gulp.src(['src/assets/icons/*.svg']) // Source folder containing the SVG images
    .pipe(iconfontCss({
      fontName: fontName, // The name that the generated font will have
      // path: 'src/assets/fonts/scss/icons.scss', // The path to the template that will be used to create the SASS/LESS/CSS file
      targetPath: '../iconcss/icons.css', // The path where the file will be generated
      fontPath: '../fonts/' // The path to the icon font file
    }))
    .pipe(iconfont({
      prependUnicode: false, // Recommended option 
      fontName: fontName, // Name of the font
      formats: ['ttf', 'eot', 'woff', 'woff2'], // The font file formats that will be created
      normalize: true,
      fontHeight: 1001,
      timestamp: runTimestamp // Recommended to get consistent builds when watching files
    }))
    .pipe(gulp.dest('src/assets/fonts/'));
});

gulp.task('compile-scss', () => {
  return gulp.src('src/assets/themes/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/assets/themes/css'));
});

gulp.task('minify-css', () => {
  return gulp.src('src/assets/**/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('src/assets'));
});

gulp.task('minify-js', done => {
  gulp.src('src/assets/externaljs/*.js')
      .pipe(terser())
      .pipe(gulp.dest('src/assets/externaljs/minified'));
      done();
});

gulp.task('build', gulp.series('compile-scss', 'minify-css', 'minify-js'));
