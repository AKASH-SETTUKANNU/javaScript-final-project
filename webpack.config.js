const path = require('path');

module.exports = {
  entry: {
    adminAgenda: './src/adminAgenda/adminAgenda.ts',
    adminEvents: './src/adminEvents/adminEvents.ts',
    adminGuest: './src/adminGuest/adminGuest.ts',
    adminIndex: './src/adminIndex/adminIndex.ts',
    events: './src/events/events.ts',
    guests: './src/guest/guest.ts',
    index: './src/index/index.ts',
    agenda: './src/agenda/agenda.ts',
    login: './src/login/login.ts',
    signup: './src/signup/signup.ts'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  mode: 'development'
};
