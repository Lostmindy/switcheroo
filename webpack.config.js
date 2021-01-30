const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		library: 'Switcheroo',
	    libraryTarget: 'umd',
	    libraryExport: 'default',
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
    	alias: {
      		core: path.resolve(__dirname, "../../core")
    	}
  	}
};