var path = require('path');
var webpack  = require('webpack');

module.exports = {
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx']
    },

    entry: {
        main: path.resolve(__dirname, 'index.js')
    },

    output: {
        library: 'ReactSlyer',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
        filename: 'ReactSlyer.js'
    },
    
    externals: [
        {
            react: {
                root: "React",
                commonjs2: "react",
                commonjs: "react",
                amd: "react"
            }
        }
    ],
    
    module: {
        loaders: [
            {
                test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'
            }
        ]
    },
    
    plugins: []
};
