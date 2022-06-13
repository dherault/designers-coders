const path = require('path')

const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)

  Object.assign(config.resolve.alias, {
    react: path.resolve('./node_modules/react'),
  })

  // Customize the config before returning it.
  return config
}
