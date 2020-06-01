import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'production',
  entry: './fe/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist/fe'),
    filename: 'bundle.js'
  }
};

export default config;