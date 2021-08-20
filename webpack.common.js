const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    output: {
        globalObject: "this",
        path: path.resolve(__dirname, "dist"),
        filename: "bundle-[chunkhash].js",
        clean: true,
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/images/[hash][ext][query]",
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[hash][ext][query]",
                },
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 70000,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: '~',
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                },
                default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
                },
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/templates/index.html",
            filename: "index.html",
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery",
            "window.jQuery": "jquery",
            Popper: ["popper.js", "default"],
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FaviconsWebpackPlugin({
            logo: path.resolve(__dirname, "src/assets/logo.png"),
            mode: "webapp",
            devMode: "webapp",
            prefix: "assets/",
            inject: true,
            favicons: {
                appName: "IoT PI",
                appShortName: "IoT PI",
                appDescription: "Tes tes",
                developerName: "IoT PI Team",
                background: "#37b1c7",
                theme_color: "#37b1c7",
                appleStatusBarStyle: "black-translucent",
                start_url: "/",
                scope: "/",
                display: "standalone",
                orientation: "any",
                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: false,
                    coast: false,
                    favicons: true,
                    firefox: false,
                    windows: true,
                    yandex: false,
                },
            },
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
    ],
};
