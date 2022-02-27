const withFonts = require('next-fonts')
const withPlugins = require('next-compose-plugins');
module.exports = withFonts({
  webpack(config, options) {
    return config
  },
  distDir: 'build',
})
