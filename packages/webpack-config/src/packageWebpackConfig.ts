/* istanbul ignore file */
import path from 'path'
import { WebpackConfigPart } from '../types'

/* istanbul ignore next */
const packageWebpackConfig: WebpackConfigPart = {
  output: {
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  resolve: {
    alias: {
      react: path.resolve(process.cwd(), './node_modules/react'),
      'react-dom': path.resolve(process.cwd(), './node_modules/react-dom'),
    },
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
  },
}

/* istanbul ignore next */
export default packageWebpackConfig
