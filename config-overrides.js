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
    return config
  }