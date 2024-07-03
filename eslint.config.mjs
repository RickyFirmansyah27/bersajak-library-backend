import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    {
        files: ['**/*.js'],
        languageOptions: { 
            sourceType: 'commonjs',
            globals: {
                ...globals.browser,
                process: 'readonly'
            } 
        },
        rules: {
            'no-undef': ['error', { 'typeof': true }],
        }
    },
    pluginJs.configs.recommended,
];
