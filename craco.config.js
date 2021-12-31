module.exports = {
  babel: {
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: false }],
      ['@babel/plugin-proposal-private-methods', { loose: false }],
      ['@babel/plugin-proposal-private-property-in-object', { loose: false }],
    ],
  },
}
