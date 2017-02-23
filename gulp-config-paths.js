/**
 * 根据自己的目录配置
 * 
 */

var paths = {
    html: {
        src: ['src/*.html','src/*.inc'],
        dest: 'dist/' 
    },
    styles: {
        src: 'src/less/**/*.less',
        dest: 'dist/less/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/scripts'
    },
    images: {
        src: 'src/images/**/*.{jpg,jpeg,png,gif}',
        dest: 'dist/images'
    }
};

module.exports = paths;
