const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {

    mode: 'production',
    entry: './src/app.ts',                          // Can be relative path

    output: {
        filename: 'bundle.js',                      // Can also do something like 'bundle.[contenthash].js to have webpack automatically generate a hash to preserve versions of builds
        path: path.resolve(__dirname, 'dist')       // Path has to be an absolute path, so we import the 'path' nodeJs module to get it for us.
    },
    module: {
        rules: [
            { 
                test: /\.ts$/, 
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [                                  // Similar to 'module' configuration but instead of a per file basis, it is project-wide
        new CleanPlugin.CleanWebpackPlugin()    // Clears everything in the dist folder
    ]

};