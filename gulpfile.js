const { src, dest, watch, parallel } = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const browsersync = () => {
  browserSync.init({
    server: {
      baseDir: 'dist/',
    },
    port: 3000,
    notify: false,
  });
};

const pughtml = () => {
  return src(['src/views/**/*.pug', '!src/views/includes/**/*.pug'])
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const styles = () => {
  return src('src/less/main.less')
    .pipe(
      less({
        includePath: ['./node_modules'],
      })
    )
    .pipe(
      autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })
    )
    .pipe(dest('dist/'))
    .pipe(browserSync.stream());
};

const watching = () => {
  watch(['src/less/**/*.less'], styles);
  watch(['src/views/**/*.pug'], pughtml).on('change', browserSync.reload);
};

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.pughtml = pughtml;

exports.default = parallel(pughtml, styles, browsersync, watching);
