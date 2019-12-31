const glob = require("glob")
const PurgeCssPlugin = require("purgecss-webpack-plugin")

module.exports = ({ env }) => {
  const config = {
    style: {
      postcss: { plugins: [require("tailwindcss")] },
    },
    webpack: { plugins: [] },
  }

  if (env === "production") {
    config.webpack.plugins.push(
      new PurgeCssPlugin({
        paths: glob.sync(`@(src|public)/**/*`, { nodir: true }),
      }),
    )
    config.style.postcss.plugins.push(require("autoprefixer"))
  }

  return config
}
