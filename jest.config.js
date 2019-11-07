module.exports = {
    ...require('./test/jest-common'),
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
    wcollectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
    coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/', '__server_tests__/'],

    projects: ['./test/jest.lint.js', './test/jest.app.js']
};
