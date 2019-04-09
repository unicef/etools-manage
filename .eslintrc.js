module.exports = {
    parser: '@typescript-eslint/parser',

    extends: [
        './config/eslintDefaults.js',
        './config/eslint.react.js',
        // // 'plugin:import/errors',
        'plugin:@typescript-eslint/recommended',

    ],
    plugins: ['@typescript-eslint', 'babel', 'react-hooks'],
    
   parserOptions:  {
      ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
      sourceType:  'module',  // Allows for the use of imports
      "ecmaFeatures": {
        "jsx": true
      },
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: `${__dirname}/config/webpack.config.js`
            }
        },

    },
    globals: {
        System: true,
        env: true
    },
    rules: {
        'accessor-pairs': 'error',
        'array-bracket-newline': 'off',
        'array-callback-return': 'error',
        'array-element-newline': 'off',
        'arrow-body-style': 'off',
        'arrow-parens': [
            'error',
            'as-needed'
        ],
        'arrow-spacing': [
            'error',
            {
                after: true,
                before: true
            }
        ],
        'block-scoped-var': 'error',
        'block-spacing': 'error',
        'brace-style': [
            'error',
            '1tbs'
        ],
        'callback-return': 'off',
        camelcase: 'off',
        'capitalized-comments': 'off',
        'class-methods-use-this': 'off',

        'comma-dangle': 'error',
        'comma-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ],
        'comma-style': [
            'error',
            'last'
        ],
        complexity: 'error',
        'computed-property-spacing': [
            'error',
            'never'
        ],
        'consistent-return': 'off',
        'consistent-this': 'error',
        curly: 'error',
        'default-case': 'error',
        'dot-location': [
            'error',
            'property'
        ],
        'dot-notation': [
            'error',
            {
                allowKeywords: true
            }
        ],
        eqeqeq: 'error',
        'func-call-spacing': 'error',
        'func-name-matching': 'error',
        'func-names': 'off',

        // 'func-style': [
        //     'error',
        //     'expression',
        //     {
        //         allowArrowFunctions: true
        //     }
        // ],
        'function-paren-newline': 'off',
        'generator-star-spacing': 'off',
        'global-require': 'error',
        'guard-for-in': 'error',
        'handle-callback-err': 'error',
        'id-blacklist': 'error',
        'id-length': 'off',
        'id-match': 'error',
        'implicit-arrow-linebreak': 'off',
        'init-declarations': 'off',
        'jsx-quotes': [
            'error',
            'prefer-double'
        ],
        'key-spacing': 'error',
        'line-comment-position': 'off',
        'linebreak-style': [
            'error',
            'unix'
        ],
        'lines-around-comment': 'off',
        'lines-around-directive': 'error',
        'lines-between-class-members': 'off',
        'max-classes-per-file': ['error', 2],
        'max-depth': 'error',
        'max-len': 'off',
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'max-nested-callbacks': 'error',
        'max-params': 'off',
        'max-statements': 'off',
        'max-statements-per-line': 'error',
        'multiline-comment-style': 'off',
        'multiline-ternary': 'off',
        'new-cap': 'error',
        'new-parens': 'error',
        'newline-after-var': 'off',
        'newline-before-return': 'off',
        'newline-per-chained-call': 'off',
        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-await-in-loop': 'error',
        'no-bitwise': 'error',
        'no-buffer-constructor': 'error',
        'no-caller': 'error',
        'no-catch-shadow': 'error',
        'no-confusing-arrow': 'off',
        'no-console': 0,
        'no-continue': 'error',
        'no-div-regex': 'error',
        'no-duplicate-imports': 'error',
        'no-else-return': 'error',
        'no-empty': [
            'error',
            {
                allowEmptyCatch: true
            }
        ],
        'no-empty-function': 'off',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-label': 'error',
        'no-extra-parens': 'off',
        'no-floating-decimal': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-inline-comments': 'off',
        // 'no-invalid-this': 'error',
        'babel/no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-loop-func': 'error',
        'no-magic-numbers': 'off',
        'no-mixed-operators': [
            'error',
            {
                allowSamePrecedence: true
            }
        ],
        'no-mixed-requires': 'error',
        'no-multi-assign': 'error',
        'no-multi-spaces': [
            'error',
            {
                ignoreEOLComments: true
            }
        ],
        'no-multi-str': 'error',
        'no-multiple-empty-lines': 'error',
        'no-native-reassign': 'error',
        'no-negated-condition': 'error',
        'no-negated-in-lhs': 'error',
        'no-nested-ternary': 'off',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-object': 'error',
        'no-new-require': 'error',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': 'off',
        'no-path-concat': 'error',
        'no-plusplus': 'off',
        'no-process-env': 'off',
        'no-process-exit': 'error',
        'no-proto': 'error',
        'no-prototype-builtins': 'error',
        'no-restricted-globals': 'error',
        'no-restricted-imports': 'error',
        'no-restricted-modules': 'error',
        'no-restricted-properties': 'error',
        'no-restricted-syntax': 'error',
        'no-return-assign': 'error',
        'no-return-await': 'error',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow': 'off',
        'no-shadow-restricted-names': 'error',
        'no-spaced-func': 'error',
        'no-sync': 'error',
        'no-tabs': [
            'off', {
                allowIndentationTabs: false
            }],
        'no-template-curly-in-string': 'error',
        'no-ternary': 'off',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-undefined': 'off',
        'no-underscore-dangle': 'off',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': [
            'error',
            {
                defaultAssignment: true
            }
        ],
        'no-unused-expressions': 'off',
        'no-use-before-define': 'off',
        "@typescript-eslint/no-use-before-define":"off",
        "@typescript-eslint/explicit-function-return-type":"off",
        'no-useless-call': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'no-void': 'error',
        'no-warning-comments': 'off',
        'no-whitespace-before-property': 'error',
        'no-with': 'error',
        'nonblock-statement-body-position': 'error',
        'object-curly-newline': 'off',
        'object-property-newline': 'off',
        'object-shorthand': 'error',
        'one-var': 'off',
        'one-var-declaration-per-line': 'error',
        'operator-assignment': [
            'error',
            'always'
        ],
        'operator-linebreak': 'off',
        'padded-blocks': 'off',
        'padding-line-between-statements': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-destructuring': 'off',
        'prefer-numeric-literals': 'error',
        'prefer-object-spread': 'off',
        'prefer-promise-reject-errors': [
            'error',
            {
                allowEmptyReject: true
            }
        ],
        'prefer-reflect': 'off',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'off',
        'quote-props': [1, 'as-needed'],
        radix: [
            'error',
            'always'
        ],
        'require-await': 'off',
        'require-jsdoc': 'off',
        'rest-spread-spacing': [
            'error',
            'never'
        ],
        'react/jsx-indent': [
            'off',
            4,
            {
                checkAttributes: true
            }
        ],
        'react/self-closing-comp': ['error', {
            component: true,
            html: true
        }],
        'react/prop-types': 'off',
        'semi-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ],
        'semi-style': [
            'error',
            'last'
        ],
        'sort-imports': 'off',
        'sort-keys': 'off',
        'sort-vars': 'error',
        'space-before-function-paren': 'off',
        'space-in-parens': [
            'error',
            'never'
        ],
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        'spaced-comment': [
            'error',
            'always'
        ],
        strict: 'error',
        'switch-colon-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ],
        'symbol-description': 'error',
        'template-curly-spacing': [
            'error',
            'never'
        ],
        'template-tag-spacing': 'error',
        'unicode-bom': [
            'error',
            'never'
        ],
        'valid-jsdoc': 'off',
        'vars-on-top': 'error',
        'wrap-iife': 'error',
        'wrap-regex': 'error',
        'yield-star-spacing': 'error',
        yoda: [
            'error',
            'never'
        ],
        "react-hooks/rules-of-hooks": "error"

    }
};
