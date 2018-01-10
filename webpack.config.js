var path = require('path');
var webpack  = require('webpack');

module.exports = {
    // resolve: {
    //     modules: ['node_modules'],
    //     extensions: ['.js', '.jsx']
    // },

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
                loader: 'babel-loader',
                options: {
                    presets: ["env"]
                }
            }
        ]
    },

    externals: {
        react: 'commonjs react'
    }
};
