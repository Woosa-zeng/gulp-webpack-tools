###  使用说明
	npm install  或者 cnpm install
	gulp dev 启动 服务器
	测试可单独执行每项
	默认dev启动时root设置为dist,运行gulp build时需要修改server-config.js里root为build

### 功能

####开发
	gulp dev
	* 使用了代理，可自行配置
	* 页面自动刷新
	* html页面片断引入
	* js打包,es6转es5	
	* 图片压缩
	* less编译,浏览器前缀
####发布
	gulp build
	* 使用了代理，可自行配置
	* 页面自动刷新
	* html页面片断引入,压缩
	* js打包,压缩,es6转es5,MD5	
	* 图片压缩
	* less编译,压缩,浏览器前缀,MD5

### 注意事项
	* 首次打开页面可能图片加载过慢，需要在加载完成后手动刷新页面一次
	* 使用gulp4,参考https://github.com/gulpjs/gulp/tree/4.0
	* gulpfile.js里面的代理服务器proxy需要配置



