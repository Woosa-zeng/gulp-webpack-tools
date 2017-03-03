var gulp = require('gulp');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');

var servers = function(){
    connect.server({
    	/*dev下使用dist,build下切换root*/
        root: ['dist'], 
        // root: ['build'], 
        port: 8000,
        livereload: true,
        middleware: function(connect, opt) {
           return [
                /*代理服务器配置*/
                proxy([
                    '/sysArea',
                    '/advertise',
                    '/login',
                    '/faq',
                    '/vCode',
                    '/ratalcars'
                ],  
                {
                    target: 'http://localhost:8080',
                    changeOrigin:true
                })
            ]; 
        }
    });
};
module.exports= servers;
