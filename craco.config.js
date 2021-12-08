module.exports = {
  babel: {
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: false }],
    ],
    // Babel >= 7.13.0 (https://babeljs.io/docs/en/assumptions)
    assumptions: {
      setPublicClassFields: false,
    },
  },
}
