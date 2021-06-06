module.exports = {
    "parser": "@typescript-eslint/parser",
    "extends": ["plugin:@typescript-eslint/recommended"],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        "semi": ["error", "never"],
        "quotes": ["error", "single"],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": 1,
        "@typescript-eslint/no-inferrable-types": [
            "warn", {
                "ignoreParameters": true
            }
        ],
        "@typescript-eslint/no-unused-vars": "warn"
    },
};
