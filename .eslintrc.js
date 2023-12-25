module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "standard-with-typescript",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "project": './tsconfig.eslint.json',
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "ignorePatterns": [
      "**/*.d.ts",
      "**/*.js",
      'dist/',
      '.eslintrc.js',
      'jest.config.js',
    ],
    "rules": {
    }
}
