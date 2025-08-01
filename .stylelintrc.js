module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  plugins: [
    'stylelint-order'
  ],
  rules: {
    // Property ordering for better maintainability
    'order/properties-order': [
      'content',
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'flex',
      'flex-direction',
      'flex-wrap',
      'justify-content',
      'align-items',
      'align-content',
      'order',
      'flex-grow',
      'flex-shrink',
      'flex-basis',
      'align-self',
      'grid',
      'grid-template',
      'grid-template-columns',
      'grid-template-rows',
      'grid-template-areas',
      'grid-column',
      'grid-row',
      'grid-area',
      'gap',
      'float',
      'clear',
      'box-sizing',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'overflow',
      'overflow-x',
      'overflow-y',
      'background',
      'background-color',
      'background-image',
      'background-position',
      'background-size',
      'background-repeat',
      'background-attachment',
      'border',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-width',
      'border-style',
      'border-color',
      'border-radius',
      'box-shadow',
      'outline',
      'color',
      'font',
      'font-family',
      'font-size',
      'font-weight',
      'font-style',
      'font-variant',
      'line-height',
      'letter-spacing',
      'text-align',
      'text-decoration',
      'text-transform',
      'text-shadow',
      'white-space',
      'word-wrap',
      'word-break',
      'opacity',
      'visibility',
      'transform',
      'transition',
      'animation'
    ],

    // BEM naming convention
    'selector-class-pattern': [
      '^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+)?$',
      {
        message: 'Expected class selector to follow BEM naming convention'
      }
    ],

    // Custom property naming
    'custom-property-pattern': [
      '^[a-z]([a-z0-9-]+)*$',
      {
        message: 'Expected custom property to be kebab-case'
      }
    ],

    // Prevent unknown properties but allow CSS custom properties
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          // CSS custom properties
          '/^--/',
          // Modern CSS properties that might not be recognized
          'scroll-behavior',
          'backdrop-filter',
          'overscroll-behavior',
          'scroll-snap-type',
          'scroll-snap-align',
          'scroll-snap-stop',
          'contain',
          'content-visibility',
          'contain-intrinsic-size'
        ]
      }
    ],

    // Allow unknown at-rules for modern CSS features
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'supports',
          'layer',
          'container',
          'starting-style'
        ]
      }
    ],

    // Function whitelist
    'function-url-no-scheme-relative': true,
    'function-url-scheme-allowed-list': ['data', 'https'],

    // Color guidelines
    'color-named': 'never',
    'color-no-hex': null, // Allow hex colors

    // Font
    'font-family-name-quotes': 'always-where-recommended',
    'font-weight-notation': 'numeric',

    // Units
    'length-zero-no-unit': true,
    'unit-allowed-list': [
      'px', 'em', 'rem', '%', 'vh', 'vw', 'vmin', 'vmax',
      's', 'ms', 'deg', 'fr', 'ch', 'ex', 'lh', 'rlh',
      'cqw', 'cqh', 'cqi', 'cqb', 'cqmin', 'cqmax'
    ],

    // Values
    'declaration-property-value-no-unknown': true,
    'shorthand-property-no-redundant-values': true,

    // Selectors
    'selector-max-id': 0, // No ID selectors
    'selector-max-universal': 1,
    'selector-max-type': 3,
    'selector-max-class': 4,
    'selector-max-compound-selectors': 4,
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute', 'class']
      }
    ],

    // Media queries
    'media-feature-name-no-unknown': [
      true,
      {
        ignoreMediaFeatureNames: [
          'prefers-reduced-motion',
          'prefers-color-scheme',
          'prefers-contrast',
          'inverted-colors'
        ]
      }
    ],

    // Comments
    'comment-word-disallowed-list': [
      ['TODO', 'FIXME', 'XXX'],
      {
        severity: 'warning'
      }
    ],

    // Specificity
    'selector-max-specificity': '0,4,0',

    // Formatting rules
    'indentation': 2,
    'max-line-length': 100,
    'no-eol-whitespace': true,
    'no-missing-end-of-source-newline': true,

    // Declaration block
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-trailing-semicolon': 'always',

    // Rules
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ],

    // At-rules
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'blockless-after-blockless'],
        ignore: ['after-comment']
      }
    ],

    // Modern CSS features validation
    'no-unknown-animations': true,
    'keyframe-declaration-no-important': true
  },
  
  overrides: [
    {
      files: ['**/*.scss', '**/*.sass'],
      customSyntax: 'postcss-scss'
    },
    {
      files: ['**/*.css'],
      rules: {
        // Allow CSS custom properties in regular CSS files
        'property-no-unknown': [
          true,
          {
            ignoreProperties: ['/^--/']
          }
        ]
      }
    }
  ]
};