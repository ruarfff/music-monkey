const { babelInclude, override, fixBabelImports } = require('customize-cra')
const path = require('path')
const fs = require('fs')

module.exports = (config, env) => {
  return Object.assign(
    config,
    override(
      babelInclude([path.resolve('src'), fs.realpathSync('../mm-shared/src')]),
      fixBabelImports('core', {
        libraryName: '@material-ui/core',
        libraryDirectory: 'esm',
        camel2DashComponentName: false
      }),
      fixBabelImports('icons', {
        libraryName: '@material-ui/icons',
        libraryDirectory: 'esm',
        camel2DashComponentName: false
      })
    )(config, env)
  )
}
