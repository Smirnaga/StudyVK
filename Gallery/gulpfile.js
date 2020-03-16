const {series,src,dest,watch} = require('gulp');
const concat = require('gulp-concat');
const babel = require("gulp-babel");
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const inject = require('gulp-inject');
const sourcemaps = require('gulp-sourcemaps');

/* const sourcemaps = require('gulp-sourcemaps'); */

function defaultTask(cb){
    console.log('Gulp is running');
    cb();
}
function html() {
    console.log('building html');
    return src('./src/index.html').pipe(dest('./dist'));

}


function vendorsJS() {
    return src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/jquery-ui',
        './src/jquery.fancybox.min.js'])
        .pipe(concat('vendors.js'))
        .pipe(dest('./dist'));
}

function vendorsCSS() {
    return src(['./src/jquery.fancybox.min.css'])
        .pipe(concat('vendors.css'))
        .pipe(dest('./dist'));
}

function scripts(){
    console.log('scripts is running');
    return src('./src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('./dist'));
        
}
function styles() {
    console.log('building styles');
    return src('./src/styles.sass')
        .pipe(sass())
        .pipe(dest('./dist'))
        .pipe(browserSync.stream({ match: '**/*.css' }));
}

function injectFiles() {
    const sources = src(
        [
            './dist/vendors.js',
            './dist/all.js',
            './dist/vendors.css',
            './dist/styles.css'
        ],
        {
            read: false
        }
    );

    return src('./dist/index.html')
        .pipe(
            inject(sources, {
                relative: true,
                transform: function(path) {
                    if (path.endsWith('.js')) {
                        return `<script src="${path}" defer></script>`;
                    }
                    return inject.transform(...arguments);
                }
            })
        )
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

    watch(
        './src/**/*.js',
        series(html, scripts, injectFiles, cb => {
            browserSync.reload();
            cb();
        })
    );
    watch('./src/**/*.sass', styles);
}

const build = series(html, scripts, styles,vendorsJS,vendorsCSS,injectFiles);

module.exports = {
    default: defaultTask,
    build: build,
    dev: series(build,watchFiles),
    serve: series(build, serve)
};