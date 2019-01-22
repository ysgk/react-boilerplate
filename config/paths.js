const path = require('path')

const resolveApp = (relativePath) => path.resolve(path.resolve(__dirname, '..'), relativePath)

module.exports = {
  root: resolveApp(''),
  public: resolveApp('public'),
  src: resolveApp('src'),
  dist: resolveApp('dist'),
}
