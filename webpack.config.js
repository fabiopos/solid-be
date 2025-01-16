/* eslint-disable @typescript-eslint/no-require-imports */
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: './src/main.ts',
  target: 'node',
  externals: [nodeExternals()],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/mocks': path.resolve(__dirname, './src/mocks'),
      '@/shared': path.resolve(__dirname, './src/shared'),
    },
    modules: ['src'],
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
