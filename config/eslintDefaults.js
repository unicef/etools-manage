module.exports = {
    env: {
        node: true,
        mocha: true,
        es6: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        'array-bracket-spacing': ['error', 'never'],
        'eol-last': ['error', 'always'],
        'indent': ['error', 4],
        'keyword-spacing': ['error'],
        'no-tabs': ['error'],
        'object-curly-spacing': ['error', 'always'],
        'prefer-const': ['error'],
        semi: ['error', 'always'],
        'space-before-blocks': ['error', 'always'],
        quotes: ['error', 'single']
    }
};
