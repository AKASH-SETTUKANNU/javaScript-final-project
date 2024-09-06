const path = require('path');

module.exports = {
  mode: 'development',
  devtool:'source-map',
  entry: {
    signup: './signup/signup.ts',
    login: './login/login.ts',
    index:'./index/index.ts',
    guests:'./guests/guest.ts',
    events:'./events/events.ts',
    adminLoginUsers:'./adminLoginUsers/loginUsers.ts'
  },
  output: {
    filename: '[name].bundle.js', // Dynamic output filenames based on entry point names
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve both .ts and .js files
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Apply ts-loader to TypeScript files
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'web', // Ensure the bundles are for the web
};