const {series,src,dest} = require('gulp');
const concat = require('gulp-concat');

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
        .pipe(concat('all.js'))
        .pipe(dest('./dist'));
}
function styles(cb){
    console.log('styles is running');
    cb();
}



module.exports = {
    default: defaultTask,
    build: series(html,scripts,styles)
}