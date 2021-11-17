const CracoCesiumPlugin = require('craco-cesium');
// const CracoPluginReactHotReload = require('craco-plugin-react-hot-reload');

// const cesiumSource = 'node_modules/cesium/Source';
// const path = require('path');

// module: {
//   rules: [
//     {
//       test: /.js$/,
//       include: path.resolve(__dirname, cesiumSource),
//       use: {
//         loader: require.resolve('@open-wc/webpack-import-meta-loader'),
//       },
//     },
//   ],
// },

module.exports = {
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
        use: { loader: require.resolve('@open-wc/webpack-import-meta-loader') },
      });
      return config;
    },
  },
  plugins: [
    // { plugin: CracoPluginReactHotReload },
    {
      plugin: CracoCesiumPlugin({
        loadPartially: true,
        loadCSSinHTML: true,
        cesiumPath: 'cesium',
      }),
    },
  ],
};
