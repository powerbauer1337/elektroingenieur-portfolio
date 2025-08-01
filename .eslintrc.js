module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  rules: {
    // Error prevention
    'no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_' 
    }],
    'no-console': 'off', // Allow console for development
    'no-debugger': 'warn',
    'no-alert': 'warn',
    
    // Best practices
    'prefer-const': 'error',
    'no-var': 'error',
    'no-implicit-globals': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    
    // ES6+ features
    'arrow-spacing': 'error',
    'no-duplicate-imports': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': 'error',
    
    // Code style
    'indent': ['error', 2, { SwitchCase: 1 }],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'es5'],
    'comma-spacing': 'error',
    'key-spacing': 'error',
    'space-before-blocks': 'error',
    'space-infix-ops': 'error',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    
    // Functions
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always'
    }],
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    
    // Comments
    'spaced-comment': ['error', 'always'],
    
    // Complexity
    'max-len': ['warn', { 
      code: 100, 
      ignoreUrls: true, 
      ignoreStrings: true, 
      ignoreTemplateLiterals: true 
    }],
    'max-params': ['warn', 4],
    'complexity': ['warn', 10],
    
    // DOM/Browser specific
    'no-global-assign': 'error',
    'no-self-assign': 'error',
    'no-unmodified-loop-condition': 'error'
  },
  globals: {
    // Browser globals
    window: 'readonly',
    document: 'readonly',
    navigator: 'readonly',
    console: 'readonly',
    
    // Modern browser APIs
    IntersectionObserver: 'readonly',
    MutationObserver: 'readonly',
    ResizeObserver: 'readonly',
    requestAnimationFrame: 'readonly',
    cancelAnimationFrame: 'readonly',
    
    // Service Worker
    ServiceWorkerGlobalScope: 'readonly',
    WorkerGlobalScope: 'readonly',
    importScripts: 'readonly',
    
    // Testing
    describe: 'readonly',
    it: 'readonly',
    test: 'readonly',
    expect: 'readonly',
    beforeEach: 'readonly',
    afterEach: 'readonly',
    jest: 'readonly'
  },
  overrides: [
    {
      files: ['sw.js', 'service-worker.js'],
      env: {
        browser: false,
        serviceworker: true
      },
      globals: {
        self: 'readonly',
        caches: 'readonly',
        skipWaiting: 'readonly',
        clients: 'readonly'
      }
    },
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true
      }
    },
    {
      files: ['webpack.config.js', 'postcss.config.js', '.eslintrc.js'],
      env: {
        node: true,
        browser: false
      }
    }
  ]
};