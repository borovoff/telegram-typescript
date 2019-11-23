const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: './dist',
    },
    devtool: "inline-source-map",
    plugins: [
        new CopyPlugin([
            { from: './src/assets', to: 'assets' },
            { from: './src/index.html' },
            { from: '*.worker.js', context: './node_modules/tdweb/dist/'},
            { from: '*.mem', context: './node_modules/tdweb/dist/'},
            { from: '*.wasm', context: './node_modules/tdweb/dist/'},
        ])
    ]
};
