import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

const htmlWebpack = new HtmlWebpackPlugin({
    template: 'index.html',
    inject: 'body'
});

const copyFiles = new CopyWebpackPlugin([
    {from: 'config.xml'},
    {from: 'icon.png'},
    {from: 'assets', to: 'assets'}
]);

const extractCss = new ExtractTextPlugin({
    filename: 'css/[name].css'
});

const config: webpack.Configuration = {
    entry: ['./src/app.ts', './src/tau.js'],

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'ts-loader', exclude: '/node-modules'},
            {test: /^config\.xml$/, loader: 'file-loader', exclude: '/node-modules'},
            {
                test: /\.scss/, use: ExtractTextPlugin.extract({
                use: [
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'}
                ]
            })
            },
            {
                test: /\.(png|jpe?g|svg)$/, use: [
                {loader: 'file-loader?name=[path]/[name].[ext]'}
            ]
            }
        ]
    },

    plugins: [
        copyFiles, extractCss, htmlWebpack
    ]
};

//noinspection JSUnusedGlobalSymbols
export default config;