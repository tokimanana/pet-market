const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const webpack = require('webpack');

module.exports = {
  output: {
    path: join(__dirname, 'dist'),
    clean: true,
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: false,
      sourceMaps: true,
    }),
    // Permet à process.env d'être évalué au runtime, pas au build
    new webpack.DefinePlugin({
      'process.env.STRIPE_SECRET_KEY': 'process.env.STRIPE_SECRET_KEY',
      'process.env.DATABASE_URL': 'process.env.DATABASE_URL',
      'process.env.FRONTEND_URL': 'process.env.FRONTEND_URL',
      'process.env.PORT': 'process.env.PORT',
    }),
  ],
  // Empêcher webpack de remplacer NODE_ENV
  optimization: {
    nodeEnv: false,
  },
  // S'assurer que les modules Node.js ne sont pas bundlés
  externals: {
    // Ajoute ici les modules qui doivent rester externes si nécessaire
  },
};