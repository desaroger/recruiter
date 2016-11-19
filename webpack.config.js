'use strict';

// Modules
var webpack				= require('webpack');
var HtmlWebpackPlugin	= require('html-webpack-plugin');

// Identify the environment
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch' || ENV === 'test-coverage';
var isProd = ENV === 'build' || ENV === '';
var isWatching	= ENV === 'test-watch' || ENV === 'serve';

module.exports = function makeWebpackConfig () {

	var config = {};


	// Entry

	config.entry = {};

	if(isProd) {
		config.entry.vendor = ['angular'];
	}
	if(!isTest) {
		config.entry.app = './src/index.js';
	}


	// Output

	config.output = isTest ? {} : {
		// Absolute output directory
		path: __dirname + '/build',

		// Output path from the view of the page
		// Uses webpack-dev-server in development
		publicPath: 'http://localhost:8080/',

		// Filename for entry points
		filename: 'bundle.[name].[hash].js',

		// Filename for non-entry points
		// Only adds hash in build mode
		chunkFilename: 'bundle.[name].[hash].js'
	};


	// Devtool

	if (isTest) {
		config.devtool = isWatching ? '' : 'inline-source-map';
	} else if (isProd) {
		config.devtool = ENV === 'build-sourcemap' ? 'cheap-module-eval-source-map' : '';
	} else {
		config.devtool = 'eval-source-map';
	}


	// Loaders

	config.module = {
		preLoaders: [],
		loaders: [
			{	test: /\.js$/, loader: 'babel',	exclude: /node_modules/ },
			{ test: /\.(pug|jade)/, loader: 'pug' },

			// Images
			{ test: /\.(png|jpg|jpeg|gif)$/, loader: 'file?name=images/[name].[ext]' },
			{ test: /\.svg(.*)$/, loader: 'file?name=images/[name].[ext]' },

			// Fonts
			{ test: /\.woff2(.*)$/, loader: 'url?limit=100000&mimetype=application/font-woff2&name=fonts/[name].[ext]' },
			{ test: /\.woff(.*)$/,  loader: 'url?limit=100000&mimetype=application/font-woff&name=fonts/[name].[ext]' },
			{ test: /\.ttf(.*)$/,   loader: 'url?limit=100000&mimetype=application/octet-stream&name=fonts/[name].[ext]' },
			{ test: /\.eot(.*)$/,   loader: 'file?name=fonts/[name].[ext]' }
		]
	};

	if(isProd) {
		config.module.loaders.push({ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') });
		config.module.loaders.push({ test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') });
	}else{
		config.module.loaders.push({ test: /\.css$/, loader: isTest ? 'null' : 'style!css' });
		config.module.loaders.push({ test: /\.scss$/, loader: isTest ? 'null' : 'style!css!sass' });
	}


	// Coverage Reporter (ISPARTA)

	if (isTest) {
		config.module.preLoaders.push({
			test: /\.js$/,
			exclude: [
				/node_modules/,
				/\.spec\.js$/
			],
			loader: 'isparta-instrumenter'
		})
	}


	// Resolve

	config.resolve = {
		modulesDirectories : [
			'plugins',
			'src',
			'src/modules',
			'node_modules'
		]
	};


	// Plugins

	config.plugins = [];

	if (!isTest) {
		config.plugins.push(

			// Renders index.html
			new HtmlWebpackPlugin({
				template	: './src/index.pug',
				inject		: 'body'
			})

		)
	}

	if(isProd) {
		config.plugins.push(

			// Only emit files when there are no errors
			new webpack.NoErrorsPlugin(),

			// Dedupe modules in the output
			new webpack.optimize.DedupePlugin(),

			// Chunks
			new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'bundle.vendor.[hash].js', Infinity),

			// Css in alternate file
			new ExtractTextPlugin('styles.[name].css')
		);
	}



	// Devserver

	config.devServer = {
		stats		: 'minimal'
	};



	// Stats

	config.stats = {
		children: false
	};


	return config;
}();
