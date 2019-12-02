const { resolve } = require('path');
const MockServer = require('./mock');

module.exports = {
  baseUrl: '/',
  assetsDir: 'static',
  outputDir: 'build',
  transpileDependencies: [
    /\/node_modules\/vue-echarts\//,
    /\/node_modules\/resize-detector\//
  ],
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'));
    config.resolve
      .symlinks(true)
    return config;
  },
  css: {
    modules: false,
    extract: false,
    sourceMap: false,
    loaderOptions: {
      sass: {
        data: `
          $baseUrl: '/';
          @import '@/assets/scss/_common.scss';
        `
      }
    }
  },
  devServer: {
    // before: MockServer,
    proxy: {
      '/api': {
        pathRewrite: {
          '^/api': '',
        },
        target: ' http://192.168.43.77:8082/api',
        changeOrigin: true
      },
    }
  }
}
