module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        'standard',
        'plugin:react/recommended'
    ],
    parser: "babel-eslint",
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
    }
}
