const path = require("path");

module.exports = {
    entry: {
        "main": "./src/client/main/index.js",
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "[name]/bundle.js"
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /\node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: function() {
                                return [require("autoprefixer")];
                            }
                        }
                    },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.(png|jp(e?)g|gif|svg)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: "/assets/images/[hash].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(mp3|wav|ogg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            publicPath: "/assets/audio",
                            outputPath: "./assets/audio"
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".scss"]
    }
};
