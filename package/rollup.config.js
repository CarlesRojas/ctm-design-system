import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';

const config = [
  {
    input: './src/index.ts',

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
      commonjs(),
      copy({
        targets: [
          { src: 'src/tokens/tokens.scss', dest: 'dist' },
          { src: 'src/tokens/global.scss', dest: 'dist' },
          { src: 'src/tokens/typography.module.scss', dest: 'dist', rename: 'typography.scss' },
          { src: 'README.md', dest: 'dist' }
        ]
      })
    ],

    external: ['react', 'react-dom']
  },
  {
    input: './dist/dts/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts(), del({ hook: 'buildEnd', targets: './dist/dts' })]
  }
];

export default config;
