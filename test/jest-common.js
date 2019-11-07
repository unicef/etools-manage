const path = require('path');

module.exports = {
    rootDir: path.join(__dirname, '..'),
    moduleFileExtensions: ['js', 'ts', 'tsx', 'jsx', 'node'],
    moduleDirectories: ['node_modules'],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}'
    ],
    testEnvironment: 'jsdom',
    snapshotSerializers: ['jss-snapshot-serializer'],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
    },
    modulePaths: ['<rootDir>/src/'],
    // watchPlugins: [
    //     '<rootDir>/node_modules/jest-watch-typeahead/filename.js',
    //     '<rootDir>/node_modules/jest-watch-typeahead/testname.js',
    //     'jest-watch-select-plugins'
    // ]
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname',
        'jest-watch-select-projects'
    ]
};
