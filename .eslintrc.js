module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', 
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        'indent': ['warn', 4],
        'brace-style': [ 'error', 'allman', { 'allowSingleLine': true } ],
        'object-curly-spacing' : [ 'error', 'always' ],
        'array-bracket-spacing' : [ 'error', 'always' ],
        'semi': [ 'error', 'always' ],
        'quotes': [ 'error', 'single' ],
        'no-unused-vars': 'off',
        'no-empty': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any' : 'off',
        '@typescript-eslint/no-inferrable-types' : 'off'
    }
}