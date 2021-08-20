const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
    entry: {
        index: ["webpack-hot-middleware/client?reload=true&overlay=true&timeout=20000", "./src/scripts/app.js"],
    },
    mode: "development",
    devtool: "eval-source-map",
});
