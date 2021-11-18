const CracoCesiumPlugin = require('craco-cesium');
const CracoPluginReactHotReload = require('craco-plugin-react-hot-reload');

module.exports = function ({ env }) {
  if (env === 'production') {
    return {
      webpack: {
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
        configure: (config) => {
          // remove cesium warning
          config.module.unknownContextCritical = false;
          config.module.unknownContextRegExp =
            /\/cesium\/cesium\/Source\/Core\/buildModuleUrl\.js/;

          // remove zip.js error in webpack4
          config.module.rules.push({
            test: /\.js$/,
            use: {
              loader: require.resolve('@open-wc/webpack-import-meta-loader'),
            },
          });
          return config;
        },
      },
      plugins: [
        {
          plugin: CracoCesiumPlugin({
            loadPartially: true,
            loadCSSinHTML: true,
            cesiumPath: 'cesium',
          }),
        },
      ],
    };
  } else {
    return {
      webpack: {
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
      },
      plugins: [
        { plugin: CracoPluginReactHotReload },
        { plugin: CracoCesiumPlugin() },
      ],
    };
  }
};
