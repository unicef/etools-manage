module.exports = {
    env: {
        development: {
            presets: [
                ['@babel/preset-env', {
                    targets: {
                        browsers: [
                            'last 2 versions',
                            'ie >= 11'
                        ]
                    },
                    useBuiltIns: 'entry'
                }],
                '@babel/preset-typescript',
                '@babel/preset-react'
            ],
            plugins: [
                'universal-import',
                '@babel/syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties',
                'react-hot-loader/babel',
            ]
        },
        production: {
            presets: [
                ['@babel/preset-env', {
                    targets: {
                        browsers: [
                            'last 2 versions',
                            'ie >= 11'
                        ]
                    },
                    useBuiltIns: 'entry'
                }],
                '@babel/preset-typescript',
                '@babel/preset-react'
            ],
            plugins: [
                'universal-import',
                '@babel/syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties'
            ]
        },
        staging: {
            presets: [
                ['@babel/preset-env', {
                    targets: {
                        browsers: [
                            'last 2 versions',
                            'ie >= 11'
                        ]
                    },
                    useBuiltIns: 'entry',
                    debug: true
                }],
                '@babel/preset-typescript',
                '@babel/preset-react'
            ],
            plugins: [
                'universal-import',
                '@babel/syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties'
            ]
        },
        test: {
            presets: [
                '@babel/preset-react',
                ['@babel/preset-env', {
                    targets: {
                        browsers: [
                            'last 2 versions',
                            'ie >= 11'
                        ]
                    },
                    useBuiltIns: 'entry'
                }]
            ],
            plugins: [
                'async-import',
                ['istanbul'],
                '@babel/plugin-proposal-class-properties',
                '@babel/preset-typescript',
                '@babel/preset-react'
            ]
        }
    }
};
