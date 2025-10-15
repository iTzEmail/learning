const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Helper to get JS files in pages folder only
function getPageJsFiles(dir) {
    const entries = {};
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isFile() && file.endsWith('.js')) {
            const name = path.basename(file, '.js');
            entries[name] = fullPath;
        }
    });
    return entries;
}

const pagesDir = path.resolve(__dirname, 'src/js/pages');
const jsPages = getPageJsFiles(pagesDir);

const htmlDir = path.resolve(__dirname, 'src/pages');
const htmlPages = fs
    .readdirSync(htmlDir)
    .filter(file => file.endsWith('.html'))
    .map(file => path.basename(file, '.html'));

// Create HtmlWebpackPlugin instances per page
const htmlPlugins = htmlPages.map(page => {
    return new HtmlWebpackPlugin({
        template: path.join(htmlDir, `${page}.html`),
        filename: `${page}.html`,
        chunks: ['main', page], // include shared main + page-specific JS
    });
});

module.exports = {
    mode: 'production',
    entry: {
        main: [
            path.resolve(__dirname, 'src/js/main/firebase.js'),
            path.resolve(__dirname, 'src/js/main/session.js')
        ],
        ...jsPages
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        ...htmlPlugins,
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/css', to: 'css' },
                { from: 'src/assets', to: 'assets', noErrorOnMissing: true }
            ]
        })
    ],
    watch: true
};