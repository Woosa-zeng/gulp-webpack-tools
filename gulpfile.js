var gulp = require('gulp');
var connect = require('gulp-connect'); // 合并文件
var proxy = require('http-proxy-middleware'); //代理
var fileinclude = require('gulp-file-include'); // 可以 include html 文件
var uglify = require('gulp-uglify'); // js 压缩  
var filter = require('gulp-filter'); // 过滤筛选指定文件  
var autoprefixer = require('gulp-autoprefixer'); // 添加 CSS 浏览器前缀
var rename = require('gulp-rename'); // 重命名
var del = require('del');                   // 文件删除
var cached = require('gulp-cached'); // 缓存当前任务中的文件，只让已修改的文件通过管道 
var imagemin = require('gulp-imagemin');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var less = require('gulp-less');
var notify = require('gulp-notify');
var path = require('path');
var cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var pngquant = require('imagemin-pngquant');
var md5 = require('gulp-md5-plus');
var paths = require('./gulp-config-paths');


function clean() {
    return del(['dist/*']);
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    // .pipe(md5(10,paths.html.src))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(connect.reload());
}
function html() {
    return gulp.src(paths.html.src)  
        .pipe(fileinclude()) 
        .pipe(gulp.dest(paths.html.dest))
        .pipe(connect.reload());
}
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(babel())
        .pipe(named())
        .pipe(webpack({
            // devtool: "source-map"
        }))
        // .pipe(md5(10, paths.html.src))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(connect.reload());
}
function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true, multipass: true}))
        .pipe(gulp.dest(paths.images.dest))
        .pipe(connect.reload());   
}
function img(cb){
    return gulp.src(paths.images.src)
        .pipe(cached(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
        })))
        .pipe(gulp.dest(paths.images.dest))
        .on('finish',cb);
}
function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.html.src, html);
}
function server(){
    connect.server({
        root: ['dist'], 
        port: 8000,
        livereload: true,
        middleware: function(connect, opt) {
            return [
                /*代理服务器配置*/
                proxy('/sysArea/getDistrictList',  {
                    target: 'http://localhost:8080',
                    changeOrigin:true
                })
            ];
        }
    });
}
exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.img = img;
exports.watch = watch;
exports.server = server;

var build = gulp.series(clean, gulp.parallel(html,styles,scripts,images,watch,server));

gulp.task('dev', build);
gulp.task('default', build);


