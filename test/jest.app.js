module.exports = {
    ...require('./jest-common'),
    displayName: 'dom',
    testEnvironment: 'jest-environment-jsdom',
    coverageThreshold: {
        './src/selectors/close-section-payload.ts': {
            statements: 100,
            branches: 100,
            lines: 100,
            functions: 100
        }
    }
};
