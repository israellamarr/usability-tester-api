const fs = require( 'fs' );
const webpack = require( 'webpack' );
const path = require( 'path' );
const ReloadServerPlugin = require( 'reload-server-webpack-plugin' );
const nodeExternals = require('webpack-node-externals');

function development () {
  return {
    entry: './src/index.ts',
    output: {
      path: __dirname + '/dist',
      filename: 'server.js'
    },
    resolve: {
      extensions: ['.js', '.ts' ],
      alias: {
        app: path.join(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: [ /\.ts$/ ],
          use: 'ts-loader'
        }
      ]
    },
    plugins: [
        new ReloadServerPlugin({
          script: "dist/server.js"
        })
    ],
    target: 'node',
    externals: [ nodeExternals() ]
  };
}

function production () {
  return {
    entry: './src/index.ts',
    output: {
      path: __dirname + '/dist',
      filename: 'server.js'
    },
    resolve: {
      extensions: ['.js', '.ts' ],
      alias: {
        app: path.join(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: [ /\.ts$/ ],
          use: 'ts-loader'
        }
      ]
    },
    target: 'node',
    externals: [ nodeExternals() ]
  }
}

module.exports = function () {
  if ( process.env.NODE_ENV === 'production') {
    return production();
  } else {
    return development();
  }
};