const fs = require("fs")
const path = require("path")
const extract = require("extract-text-webpack-plugin")
const hwp = require("html-webpack-plugin")

module.exports = {
    // entry: {
    //     app: "./src/js/main.js"
    // },
    entry:path.join(__dirname, "src/js/main.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name][hash].js"
    },
    module: {
        rules: [
            { test: /\.js$/, use: "babel-loader" },
            {
                test: /\.css$/,
                use: extract.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: extract.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader"]
                })
            }
        ]
    },
    plugins: [
        new extract({
            filename: 'css/[name].[contenthash].css',
            allChunks: true
        }),
        new hwp({
            template: "./src/index.html",
            filename: "index.html",
            inject: 'body',
            minify: {
                removeComments: true,   //根据模板生成文件时去除注释
                collapseWhitespace: true  // 去除空格或者换行符（非字符）
            }
            // chunks: ['index', 'entry']
        })

    ],
    // mode: "development",
    // devServer: {
    //     contentBase: path.join(__dirname, "dist"),
    //     compress: true,
    //     port: 9000,
    //     hot:true
    // }
}