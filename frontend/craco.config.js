const CracoCesiumPlugin = require('craco-cesium');
const CracoPluginReactHotReload = require('craco-plugin-react-hot-reload');

module.exports = {
  webpack: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    { plugin: CracoPluginReactHotReload },
    {
      plugin: CracoCesiumPlugin({
        loadPartially: false,
        loadCSSinHTML: true,
        cesiumPath: 'cesium',
      }),
    },
  ],
};
