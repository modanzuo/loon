const path = require('path');
const config = {
	entry: '../index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'my-first-webpack.bundle.js'
	},
	resolve: {
		alias: {
			'@': require('path').resolve(__dirname, '../'),
			'@db': require('path').resolve(__dirname, '../db'),
			'@public': require('path').resolve(__dirname, '../public'),
		}
	}
};
module.exports = config