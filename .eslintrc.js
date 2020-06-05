module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: ['airbnb-typescript'],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        "semi": ["error", "always"],
        "quotes": ["error", "single"],
        "linebreak-style": ["error", "windows"],
        '@typescript-eslint/camelcase': 'off',
        // "indent": ["error", 4],
        "max-len": ["error", { "code": 120 }],
        "no-param-reassign": ["error", { "props": false }],
        "max-classes-per-file": ["error", 3], //MVC
        // Удобнее сначала видеть контроллер, а потом уже те классы, с которыми он работает. 
        // Сразу видно как можно работать с данным компонентом :
        "@typescript-eslint/no-use-before-define" : [ 0 ],
        "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    }
};