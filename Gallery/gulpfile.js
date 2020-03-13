const {series,src,dest,watch} = require('gulp');
const concat = require('gulp-concat');
const babel = require("gulp-babel");
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function defaultTask(cb){
    console.log('Gulp is running');
    cb();
}
function html() {
    console.log('building html');
    return src('./src/index.html').pipe(dest('./dist'));
}

function scripts(){
    console.log('scripts is running');
    return src('./src/**/*.js')
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(dest('./dist'));
        
}
function styles() {
    console.log('building styles');
    return src('./src/styles.sass')
        .pipe(sass())
        .pipe(dest('./dist'));
}

function watchFiles() {
    watch('./src/**/*.js', scripts);
    watch('./src/**/*.sass', styles);
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
}

const build = series(html, scripts, styles);

module.exports = {
    default: defaultTask,
    build: build,
    dev: series(build,watchFiles),
    serve: series(build, serve)
};