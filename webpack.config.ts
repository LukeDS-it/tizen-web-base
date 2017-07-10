import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const htmlWebpack = new HtmlWebpackPlugin({
    template: 'index.html',
    inject: 'body'
});

const copyFiles = new CopyWebpackPlugin([
    {from: 'icon.png'},
    {from: 'assets', to: 'assets'}
]);

const extractCss = new ExtractTextPlugin({
    filename: 'css/[name].css'
});

const uglify = new UglifyJsPlugin({compress: {warnings: false}});

const config: webpack.Configuration = {
    entry: ['./src/app.ts'],

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.min.js'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'ts-loader', exclude: '/node-modules'},
            {test: /config\.xml$/, use: [
                {loader: 'file-loader?name=config.xml'},
                {loader: 'extricate-loader'},
                {loader: 'interpolate-loader'}
            ]},
            {
                test: /\.scss/, use: ExtractTextPlugin.extract({
                use: [
                    {loader: 'css-loader', options: {minimize: true}},
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
        copyFiles, extractCss, htmlWebpack, uglify
    ]
};

//noinspection JSUnusedGlobalSymbols
export default config;