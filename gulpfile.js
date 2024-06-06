'use strict';

const dir =  {
  src: './src/',
  build: './docs/',
};

const { series, parallel, src, dest, watch } = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const del = require('del');
const pug = require('gulp-pug');
const replace = require('gulp-replace');

const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const jsmin = require('gulp-minify');

function compilePug() {
  return src(dir.src + 'pug/pages/*.pug')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(pug())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(replace(/^(\s*)(<button.+?>)(.*)(<\/button>)/gm, '$1$2\n$1  $3\n$1$4'))
    .pipe(replace(/^( *)(<.+?>)(<script>)([\s\S]*)(<\/script>)/gm, '$1$2\n$1$3\n$4\n$1$5\n'))
    .pipe(replace(/^( *)(<.+?>)(<script\s+src.+>)(?:[\s\S]*)(<\/script>)/gm, '$1$2\n$1$3$4'))
    .pipe(dest(dir.build));
}

exports.compilePug = compilePug;

function compileStyles() {
  return src(dir.src + 'scss/**/*.scss')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest(dir.build + 'css/'))
    .pipe(browserSync.stream());
}
exports.compileStyles = compileStyles;

function processJs() {
  return src(dir.src + 'js/**/*.js')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(jsmin({
      noSource: true,
      ext: {
        min: '.min.js'
      }
    }))
    .pipe(dest(dir.build + 'js/'))
}
exports.processJs = processJs;

function copyImages() {
  return src(dir.src + 'images/*.{jpg,jpeg,png,svg,webp,gif}')
    .pipe(dest(dir.build + 'images/'));
}
exports.copyImages = copyImages;

function copyFonts() {
  return src(dir.src + 'fonts/*.{ttf,eot,svg,woff,woff2}')
    .pipe(dest(dir.build + 'fonts/'));
}
exports.copyFonts = copyFonts;

function copyFavicon() {
  return src(dir.src + 'favicon/*.*')
    .pipe(dest(dir.build + 'favicon/'));
}
exports.copyFavicon = copyFavicon;

function copyMedia() {
  return src(dir.src + 'media/*.*')
    .pipe(dest(dir.build + 'media/'));
}
exports.copyMedia = copyMedia;

function copyLibraries() {
  return src(dir.src + 'libraries/*.*')
    .pipe(dest(dir.build + 'libraries/'));
}
exports.copyLibraries = copyLibraries;

function clean() {
  return del(dir.build)
}
exports.clean = clean;

function serve() {
  browserSync.init({
    server: dir.build,
    startPath: 'index.html',
    open: false,
    port: 8080,
  });
  watch([
    dir.src + 'scss/**/*.scss',
  ], compileStyles);
  watch([
    dir.src + 'pug/**/*.pug',
  ], compilePug);
  watch(dir.src + 'js/**/*.js', processJs);
  watch(dir.src + 'images/*.{jpg,jpeg,png,svg,webp,gif}', copyImages);
  watch([
    dir.build + '*.html',
    dir.build + 'js/*.js',
    dir.build + 'images/*.{jpg,jpeg,png,svg,webp,gif}',
  ]).on('change', browserSync.reload);
}

exports.default = series(
  clean,
  parallel(
    compileStyles,
    compilePug,
    processJs,
    copyImages,
    copyFonts,
    copyFavicon,
    copyMedia,
    copyLibraries,
  ),
  serve
);
