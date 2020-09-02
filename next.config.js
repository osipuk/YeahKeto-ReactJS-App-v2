require('dotenv').config();
const webpack = require('webpack');
const Uglify = require('uglifyjs-webpack-plugin');

module.exports = {
  webpack: (config, { dev }) => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    config.plugins = config.plugins.filter(plugin => plugin.constructor.name !== 'UglifyJsPlugin');
    if (!dev) {
      config.plugins.push(new Uglify());
    }
    return config;
  },
};
