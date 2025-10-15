const path = require('path');
const fs = require('fs');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');

// Get JS files
const srcDir = path.resolve(__dirname, 'src/js');
const pages = fs
  .readdirSync(srcDir)
  .filter(file => file.endsWith('.js'))
  .map(file => path.basename(file, '.js'));

module.exports = {
    mode: 'development',
    entry: pages.reduce((config, page) => {
        config[page] = `./src/js/${page}.js`;
        return config;
    }, {}),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        },
    },
    plugins: [
        // HtmlWebPackPlugin for all pages
        ...pages.map(
        (page) =>
            new HtmlWebPackPlugin({
            inject: true,
            template: `./src/pages/${page}.html`,
            filename: `${page}.html`,
            chunks: [page],
            })
        ),

        // CopyWebPackPlugin to copy CSS folder
        new CopyWebPackPlugin({
        patterns: [
            { from: 'src/css', to: 'css' }
        ]
        })
    ],
    watch: true
}