module.exports = {
  plugins: [
    [
      'module:react-native-dotenv',
      {
        allowUndefined: true,
        allowlist: null,
        blocklist: null,
        envName: 'APP_ENV',
        moduleName: 'env',
        path: '.env',
        safe: false,
        verbose: false,
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
}
