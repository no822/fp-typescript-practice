var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
module.exports = {
    mode: 'development',
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ["dist", "public"],
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "./index.html",
            meta: {
                // meta 태그를 추가
                viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
            },
            hash: true,
            showErrors: true, // 오류 정보가 html에 기록됨
        }),
    ],
};
