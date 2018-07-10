// vue.config.js
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/blog/' : '/',
  configureWebpack: config => {
    config.performance = {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  }
}
