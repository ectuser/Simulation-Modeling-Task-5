var path = require('path');
module.exports = {
    mode: "production",
    watch: false,
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    devtool: "source-map",
    module: {
        rules: [
            { test: /\.scss$/, use: [ "style-loader", "css-loader", "sass-loader" ] },
            {
                test: /\.(tsx|js|ts)?$/,
                loader: "babel-loader"
            }
        ]
    },
};
