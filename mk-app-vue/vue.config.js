const { readFileSync } = require('fs');
const path = require('path');

const { name: npm_package_name } = require('./package.json');

// pass thought client env via VUE_APP_*
process.env.VUE_APP_NAME = npm_package_name;

// helper
const isProd = ['production', 'runtest'].some((v) => process.env.NODE_ENV === v);
const loadFile = (path = '') => readFileSync(path);

// config webpack dev server
const devServer = isProd
	? false
	: {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			disableHostCheck: true,
			sockPort: 8001,
			sockHost: 'localhost',
			port: 8001,
			https: {
				cert: loadFile(path.join(__dirname, '../cert/cert.pem')),
				key: loadFile(path.join(__dirname, '../cert/key.pem')),
			},
	  };

module.exports = {
	lintOnSave: false,
	filenameHashing: false,
	productionSourceMap: true,
	configureWebpack: {
		output: {
			path: path.resolve(__dirname, 'dist'),
			chunkFilename: 'js/_[name].js',
		},
		externals: ['vue', 'vue-router', 'js-cookie', 'vue-meta', /^@mk\/.+/],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'~': path.resolve(__dirname, 'src'),
			},
		},
		devServer,
	},
};
