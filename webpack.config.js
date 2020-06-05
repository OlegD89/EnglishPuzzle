// const webpack = require('webpack');
const path = require('path');

module.exports = (env, options) => {
    const isDevelopment = options.mode === 'development';

    return {
        mode: isDevelopment ? 'development' : 'production',
        devtool: isDevelopment ? 'source-map' : 'none',
        watch: isDevelopment,
        entry: './src/main.ts',
        module: {
            rules: [
                {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: [ '.ts', ".d.ts" ],
        },
        output: {
            filename: 'script.js',
            path: __dirname,
        },
    }
}