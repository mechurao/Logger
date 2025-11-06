import { defineConfig } from 'tsup';

export default defineConfig([
    {
        entry: ['src/index.ts'],
        format: ['cjs', 'esm'],
        dts: true,
        outDir: 'dist',
        clean: true,
        target: 'es2020',
        splitting: false,
        sourcemap: false,
        minify: false,
        cjsInterop: true,
        outExtension({ format }) {
            return { js: format === 'cjs' ? '.cjs.js' : '.esm.js' };
        },
    },
]);