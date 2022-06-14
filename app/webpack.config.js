const path = require('path')

const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)

  Object.assign(config.resolve.alias, {
    react: path.resolve('./node_modules/react'),
    'react-dom': path.resolve('./node_modules/react-dom'),
    'react-native': path.resolve('./node_modules/react-native'),
    'react-native-web': path.resolve('./node_modules/react-native-web'),
  })

  // Customize the config before returning it.
  return config
}
