// rollup.config.js
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import nodeGlobals from 'rollup-plugin-node-globals';
import nodeBuiltins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';

export default {
//   entry: 'build/index.js',
//   dest: 'dist/index.js',
//   format: 'umd',
  input: 'build/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name:"MercureClient"
  },
  // external: [ 'web3' ],
  external: ['web3'],
  preferBuiltins: true,
  plugins: [
    json({       preferConst: true,
    }),
    resolve({extensions: ['.js', '.json']}),
    commonjs({}),
    // resolve({
    //   jsnext: true,
    //   main: true
    // }),
    // nodeGlobals(),
    // nodeBuiltins(),
    // commonjs({})

    // json({
    //   // All JSON files will be parsed by default,
    //   // but you can also specifically include/exclude files
    //   exclude: [ 'node_modules/**/*' ],
    //   // for tree-shaking, properties will be declared as
    //   // variables, using either `var` or `const`
    //   preferConst: true, // Default: false
    //   // specify indentation for the generated default export —
    //   // defaults to '\t'
    //   indent: '  '
    // }),
  ]
};