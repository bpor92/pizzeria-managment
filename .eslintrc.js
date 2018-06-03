module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    extends: ['prettier', 'standard'],
    plugins: ['html'],
    rules: {
        indent: ['error', 2],
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'no-debugger': 0,
        'no-unused-vars': 1,
        'no-var': 0,
        'object-shorthand': 0,
        'space-before-function-paren': 0
    }
}
