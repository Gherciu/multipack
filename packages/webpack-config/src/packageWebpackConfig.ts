/* istanbul ignore file */
import { WebpackConfigPart } from '../types'

/* istanbul ignore next */
const packageWebpackConfig: WebpackConfigPart = {
  output: {
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  externals: {
    // Don't bundle react or react-dom
    react: 'react',
    'react-dom': 'react-dom',
  },
}

/* istanbul ignore next */
export default packageWebpackConfig
