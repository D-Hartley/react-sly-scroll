const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'index.js')
    },

    output: {
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    
    module: {
        loaders: [
            {
                test: /\.jsx?$/, 
                exclude: /(node_modules|dist)/, 
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [
        new UglifyJsPlugin()
    ],
    
    externals: {
        react: 'commonjs react'
    }
};
