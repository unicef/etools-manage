
module.exports = {
    parser: 'babel-eslint',
    plugins: [
        'react'
    ],
    env: {
        browser: true,
        node: true,
        mocha: true
    },
    extends: ['plugin:react/recommended'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: '16.4'
        }
    },
    rules: {}
};
