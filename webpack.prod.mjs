import webpackMerge from "webpack-merge";
import common from "./webpack.common.mjs";

const { merge } = webpackMerge;

export default merge(common, {
  mode: "production",
});
