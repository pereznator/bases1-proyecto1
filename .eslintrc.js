module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["google", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "prettier/prettier": ["error", {
            "endOfLine": 'auto'
        }],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "no-console": ["error", { allow: ["warn", "error", "info"] }],
        "linebreak-style": ["error", (process.platform === "win32" ? "windows" : "unix")], // https://stackoverflow.com/q/39114446/2771889
    },
    ignorePatterns: ["*.js"]
};