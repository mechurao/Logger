import { defineConfig } from 'tsup';

export default defineConfig([
    {
        entry: ['src/index.ts'],
        format: ['cjs'],
        dts: false,
        outDir: 'dist',
        outExtension: () => ({ js: `.cjs.js` }),
        clean: true,
        target: 'es2020',
        splitting: false,
        sourcemap: false,
        minify: false,
        cjsInterop: true,
    },
    {
        entry: ['src/index.ts'],
        format: ['esm'],
        dts: true,
        outDir: 'dist',
        outExtension: () => ({ js: `.esm.js` }),
        clean: false,
        target: 'es2020',
        splitting: false,
        sourcemap: false,
        minify: false,
    },
]);