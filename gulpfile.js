var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runTimestamp = Math.round(Date.now()/1000);
var fontName = 'Icons'; 
 
gulp.task('iconfont', function(){
  return gulp.src(['src/assets/icons/*.svg']) // Source folder containing the SVG images
    .pipe(iconfontCss({
      fontName: fontName, // The name that the generated font will have
     // path: 'src/assets/fonts/scss/_icons.scss', // The path to the template that will be used to create the SASS/LESS/CSS file
      targetPath: '../iconcss/_icons.css', // The path where the file will be generated
      fontPath: '../../src/assets/fonts/icons/' // The path to the icon font file
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