module.exports = {
    parser: '@babel/eslint-parser',
    extends: [
        'standard',
        'prettier',
        'prettier/standard',
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:node/recommended',
        'plugin:security/recommended'
    ],
    env: {
        node: true
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module'
    },
    plugins: ['prettier', 'security', 'import'],
    rules: {
        'node/exports-style': [2, 'exports'],
        'node/file-extension-in-import': ['error', 'always'],
        'prettier/prettier': ['error', {}],
        'import/namespace': [2, { allowComputed: true }]
    }
};
