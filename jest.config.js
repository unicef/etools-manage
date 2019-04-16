
module.exports = {
    moduleFileExtensions: ['js', 'ts', 'tsx', 'jsx', 'node'],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}'
    ],
    testEnvironment: 'jsdom',
    snapshotSerializers: ['jss-snapshot-serializer'],
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'
    ],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
    },
    setupFiles: ['react-app-polyfill/jsdom'],
    resolver: 'jest-pnp-resolver',
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts'
    ],
    modulePaths: ['<rootDir>/src/'],
    watchPlugins: [
        '<rootDir>/node_modules/jest-watch-typeahead/filename.js',
        '<rootDir>/node_modules/jest-watch-typeahead/testname.js'
    ]
};
