module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'prettier', // Добавьте Prettier в конец
    ],
    plugins: ['react', '@typescript-eslint', 'import'],
    env: {
        browser: true,
        es2021: true,
    },
    rules: {
        'react/react-in-jsx-scope': 'off', // Отключаем правило для React 17 и выше
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal'],
                'newlines-between': 'always',
            },
        ],
        'import/named': 'error',
        'import/namespace': 'error',
        'import/default': 'error',
        'import/no-unresolved': 'error',
        'import/no-named-as-default': 'error',
        'import/no-named-as-default-member': 'error',
    },
    settings: {
        react: {
            version: 'detect', // Определите версию React
        },
    },
};