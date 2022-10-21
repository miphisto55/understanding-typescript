const path = require('path');

module.exports = {

    mode: 'development',                        // Allows better development tools, this should be changed when going to production
    entry: './src/app.ts',                      // Can be relative path

    // Output object for configuring output
    output: {
        filename: 'bundle.js',                  // Can also do something like 'bundle.[contenthash].js to have webpack automatically generate a hash to preserve versions of builds
        path: path.resolve(__dirname, 'dist')   // Path has to be an absolute path, so we import the 'path' nodeJs module to get it for us.
    },
    devtool: 'inline-source-map',

    // Tells webpack how to deal with files when it comes across them on a per-file basis.
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
    }

};