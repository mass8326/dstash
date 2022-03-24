/* eslint-disable @typescript-eslint/no-var-requires */
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // These class names are most likely to be logged by NestJs
        terserOptions: { keep_classnames: /(Module|Controller)$/ },
      }),
    ],
  },
};
