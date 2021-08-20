const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
    entry: {
        index: "./src/scripts/app.js",
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            compact: false,
                        },
                    },
                ],
            },
        ],
    },
});
