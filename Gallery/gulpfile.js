const {series,src,dest} = require('gulp');

function defaultTask(cb){
    console.log('Gulp is running');
    cb();
}
function html() {
    console.log('building html');
    return src('./src/index.html').pipe(dest('./dist'));
}

function scripts(cb){
    console.log('scripts is running');
    cb();
}
function styles(cb){
    console.log('styles is running');
    cb();
}



module.exports = {
    default: defaultTask,
    build: series(html,scripts,styles)
}