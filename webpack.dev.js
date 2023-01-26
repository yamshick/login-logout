const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].js",
    // publicPath: "/",
  },
  devServer: {
    port: 3000,
    static: path.join(__dirname, "src"),
    historyApiFallback: true,
  },
  devtool: "inline-source-map",
});
