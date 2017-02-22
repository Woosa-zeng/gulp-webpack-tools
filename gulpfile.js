var gulp = require('gulp');
var connect = require('gulp-connect'); // 合并文件
var proxy = require('http-proxy-middleware'); //代理
var fileinclude = require('gulp-file-include'); // 可以 include html 文件
var rev = require('gulp-rev-append'); // 插入文件指纹（MD5）  
var uglify = require('gulp-uglify'); // js 压缩  
var filter = require('gulp-filter'); // 过滤筛选指定文件  
var autoprefixer = require('gulp-autoprefixer'); // 添加 CSS 浏览器前缀
var rename = require('gulp-rename'); // 重命名
var cssnano = require('gulp-cssnano'); // CSS 压缩  
var del = require('del');                   // 文件删除
var cached = require('gulp-cached'); // 缓存当前任务中的文件，只让已修改的文件通过管道 
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var less = require('gulp-less');
var notify = require('gulp-notify');
var path = require('path');
var browser = require('browser-sync');
var cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var paths = {
    html: {
        src: 'src/*.html',
        dest: 'dist/' 
    },
    styles: {
        src: 'src/less/*.less',
        dest: 'dist/less/'
    },
    scripts: {
        src: 'src/**/*.js',
        dest: 'dist/scripts/'
    }
};
function html() {
    return gulp.src(paths.html.src)  
        .pipe(fileinclude()) 
        .pipe(rev()) 
        .pipe(gulp.dest(paths.html.dest));
}
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
    .pipe(gulp.dest(paths.styles.dest));
}
function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(gulp.dest(paths.scripts.dest));
}
function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.html.src, html);
}

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

var build = gulp.series(clean, gulp.parallel(html,styles, scripts,watch));
gulp.task('dev', build);
gulp.task('default', build);

gulp.task('serverName', function() {
    connect.server({
        root: ['dist'],
        port: 8000,
        livereload: true,
        middleware: function(connect, opt) {
            return [
                proxy('/sysArea/getDistrictList',  {
                    target: 'http://localhost:8080',
                    changeOrigin:true
                })
            ];
        }
    });
});


