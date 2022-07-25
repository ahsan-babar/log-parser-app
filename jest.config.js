module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.test.json'
        }
    },
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/main.ts'
    ],
    moduleFileExtensions: ['js', 'json', 'ts'],
    testEnvironment: 'node',
    testRegex: '.e2e-spec.ts$',
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    globalSetup: './tests/globalSetup.ts'
};


module.exports = {

};