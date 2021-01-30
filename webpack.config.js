const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'var',
    	library: 'MONOMER'
	},
	resolve: {
    	alias: {
      		core: path.resolve(__dirname, "../../core")
    	}
  	}
};