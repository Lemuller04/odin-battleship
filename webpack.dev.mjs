import webpackMerge from "webpack-merge";
import common from "./webpack.common.mjs";

const { merge } = webpackMerge;

export default merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
});
