/**
 * Express JS
 * See {@link https://expressjs.com/ |documentation}
 */
const express = require("express");

/**
 * Webpack 5
 * See {@link https://webpack.js.org/concepts/ |documentation}
 */
const webpack = require("webpack");

/**
 * Webpack Dev Middleware
 * See {@link https://github.com/webpack/webpack-dev-middleware |documentation}
 */
const webpackDevMiddleware = require("webpack-dev-middleware");

/**
 * Webpack Hot Middleware
 * See {@link https://github.com/webpack/webpack-dev-middleware |documentation}
 * Refer {@link https://github.com/webpack-contrib/webpack-hot-middleware/pull/394/files |here} to fix auto reload issues
 */
const webpackHotMiddleware = require("webpack-hot-middleware");

/**
 * Integration Webpack + Express
 * @description Edit configuration in /webpack.dev.js and /webpack.dev.common.js
 */
let port = process.env.PORT || 3000;
const app = express();
let config;
let compiler;
if (process.env.NODE_ENV === "dev") {
    config = require("./webpack.dev.js");
    compiler = webpack(config);

    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath,
        })
    );

    app.use(webpackHotMiddleware(compiler));

    /**
     * Axios
     * @description Alternative to send response using URL, on development mode
     */
    const axios = require("axios");

    /**
     * Routing
     * @description redirect url to index.html, let routePage function on app.js take over
     */

    const handlePath = (req, res) => {
        axios
            .get(`${req.protocol}://${req.hostname}:${port}/index.html`)
            .then(function (response) {
                res.send(response.data);
            })
            .catch(function (error) {
                console.log(error);
                res.sendStatus(404).end();
            });
    };

    app.get("/*", (req, res) => {
        handlePath(req, res);
    });
} else {
    const path = require("path");
    config = require("./webpack.prod.js");
    compiler = webpack(config);
    compiler.run((err, stats) => {
        if (err) {
            console.error(err);
        } else {
            console.log("\nServing ready!\n");
        }
        compiler.close((closeErr) => {
            if (closeErr) {
                console.error(closeErr);
            }
        });
    });

    app.use("/", express.static(path.join(__dirname, "dist")));

    app.get("/*", (req, res) => {
        res.set("Content-Type", "text/html").sendFile(__dirname + "/dist/index.html");
    });
}

if (require.main === module) {
    app.listen(port, function () {
        console.log(`Listening on http://localhost:${port}\n`);
    });
}
