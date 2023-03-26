module.exports = {
  plugins: [
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    [
      'module:react-native-dotenv',
      {
        allowUndefined: true,
        allowlist: null,
        blocklist: null,
        envName: 'APP_ENV',
        moduleName: 'rn-dotenv',
        path: '.env',
        safe: false,
        verbose: false,
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
}
