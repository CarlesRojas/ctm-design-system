import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.js',

  output: [
    {
      sourcemap: true,
      file: './dist/index.js',
      format: 'esm',
      globals: { react: 'React' }
    }
  ],

  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    }),
    peerDepsExternal(),
    postcss({
      extract: false,
      modules: true,
      extensions: ['.scss'],
      use: ['sass']
    }),
    babel({ exclude: 'node_modules/**' }),
    resolve(),
    commonjs()
  ],

  external: ['react', 'react-dom']
};
