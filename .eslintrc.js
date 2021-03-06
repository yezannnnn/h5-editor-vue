module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'comma-dangle': 'warn',
        'max-len': 'off',
        'no-param-reassign': 'warn',
        'prefer-template': 'warn',
        'object-shorthand': 'warn',
        'space-before-function-paren': 'warn',
        'no-restricted-syntax': 'off',
        'guard-for-in': 'off',
        'no-nested-ternary': 'warn',
        'vue/valid-v-model': 'off',
        'no-else-return': 'off',
        'no-shadow': 'warn',
    },
};