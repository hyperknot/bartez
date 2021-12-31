module.exports = {
  webpack: {
    alias: {},
    plugins: {
      add: [],
    },
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        url: require.resolve('url/'),
        stream: require.resolve('stream-browserify'),
      }
      webpackConfig.stats = {
        children: true,
        errorDetails: true,
      }
      return webpackConfig
    },
  },
  babel: {
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: false }],
      ['@babel/plugin-proposal-private-methods', { loose: false }],
      ['@babel/plugin-proposal-private-property-in-object', { loose: false }],
    ],
    // // Babel >= 7.13.0 (https://babeljs.io/docs/en/assumptions)
    // assumptions: {
    //   setPublicClassFields: false,
    // },
  },
}
