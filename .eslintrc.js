const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'redux-saga', 'react', 'react-hooks', 'jsx-a11y'],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    amplitude: 'writable',
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': ['error', prettierOptions],
    'arrow-body-style': [2, 'as-needed'],
    'array-bracket-spacing': 1,
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    camelcase: 1,
    'class-methods-use-this': 0,
    'comma-dangle': [2, 'always-multiline'],
    'constructor-super': 1,
    curly: 1,
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 2,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    indent: [0, 2, { SwitchCase: 1 }],
    'jsx-a11y/alt-text': 2,
    'jsx-a11y/anchor-has-content': 2,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['a', 'A'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/aria-proptypes': 2,
    'jsx-a11y/aria-role': 2,
    'jsx-a11y/aria-unsupported-elements': 2,
    'jsx-a11y/click-events-have-key-events': 2,
    'jsx-a11y/heading-has-content': 2,
    'jsx-a11y/html-has-lang': 2,
    'jsx-a11y/iframe-has-title': 2,
    'jsx-a11y/interactive-supports-focus': [
      'error',
      {
        tabbable: ['button', 'checkbox', 'link', 'searchbox', 'spinbutton', 'switch', 'textbox'],
      },
    ],
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/lang': 2,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/no-access-key': 2,
    'jsx-a11y/no-redundant-roles': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'jsx-a11y/scope': 2,
    'max-depth': 1,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-debugger': 2,
    'no-empty': 1,
    'no-extra-semi': 1,
    'no-func-assign': 1,
    'no-unreachable': 1,
    'no-else-return': 1,
    'no-eval': 2,
    'no-extra-bind': 1,
    'no-fallthrough': 1,
    'no-implied-eval': 2,
    'no-loop-func': 1,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-return-assign': 1,
    'no-with': 2,
    'no-shadow': 1,
    'no-undef': 2,
    'no-unused-vars': 2,
    'no-use-before-define': 2,
    'no-continue': 1,
    'no-mixed-spaces-and-tabs': 1,
    'no-trailing-spaces': 2,
    'no-var': 1,
    'prefer-template': 2,
    'prefer-const': 2,
    radix: 2,
    'react/display-name': 1,
    'react/forbid-prop-types': 0,
    'react/jsx-boolean-value': 1,
    'react/jsx-closing-bracket-location': 1,
    'react/jsx-closing-tag-location': 0,
    'react/jsx-curly-spacing': 1,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/jsx-indent-props': 1,
    'react/jsx-no-duplicate-props': 1,
    'react/jsx-no-undef': 1,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/no-danger': 1,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/no-multi-comp': 1,
    'react/no-unknown-property': 1,
    'react/prop-types': 2,
    'react/require-default-props': 1,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
    'redux-saga/no-yield-in-race': 2,
    'redux-saga/yield-effects': 2,
    'redux-saga/no-yield-in-race': 2,
    'redux-saga/yield-effects': 2,
    'require-yield': 0,
    semi: [2, 'always'],
    'space-after-keywords': 0,
    'space-before-blocks': 2,
    // 'space-before-function-paren': [2,'never'],
    'space-in-parens': 2,
    'spaced-comment': [2, 'always'],
    strict: 1,
    'valid-typeof': 2,
    'vars-on-top': 2,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './internals/webpack/webpack.prod.babel.js',
      },
    },
  },
};
