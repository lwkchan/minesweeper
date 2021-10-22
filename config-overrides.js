const path = require('path');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");


module.exports = function override(config, env) {
    //do stuff with the webpack config...

    config.plugins = (config.plugins || []).concat([
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, "src", "rust"),
            outDir: path.resolve(__dirname, "src", "wasm"),
        }),
    ]);


    const wasmExtensionRegExp = /\.wasm$/
    config.resolve.extensions.push('.wasm')
    config.module.rules.forEach(rule => {
      (rule.oneOf || []).forEach(oneOf => {
        if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
          oneOf.exclude.push(wasmExtensionRegExp)
        }
      })
    })


    return config
  }