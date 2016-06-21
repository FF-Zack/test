var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
	devtool: "source-map",
	entry : {
		entry : './src/js/entry.js'
	},
	output : {
		path: __dirname + "./src/js/",               //设置gulp，以gulp配置为主
		filename : 'build.js'           
	},
	plugins:[
		new webpack.ProvidePlugin({
	      $: 'jquery',
	      jQuery: 'jquery',
	      'windows.jQuery': 'jquery',
	    }),
	    commonsPlugin,
	],                                 //定义需要使用的插件
	resolve : {
		extensions : ['','.js','.jsx'],         //引入模块的时候不须写后缀
		alias : {
			'jquery': './jquery',               //相对于entry.js的路径读取
		}
	},
	module : {
		noParse: [],                 //跳过的文件夹
		loaders : 
		[
			{test:/\.css$/,loader:'style!css'},
			{test:/\.js$/,loader:'jsx-loader'},
			{test: require.resolve('./src/js/fastclick'), loader: "expose?$!expose?FastClick"},
			{test: require.resolve('./src/js/jquery'), loader: "expose?$!expose?jQuery"}
		]
	},
	
	
};