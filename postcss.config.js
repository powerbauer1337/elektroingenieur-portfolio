module.exports = {
  plugins: [
    // Import CSS files
    require('postcss-import')({
      path: ['css']
    }),

    // Future CSS features
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true,
        'media-query-ranges': true,
        'custom-selectors': true,
        'color-function': true,
        'color-mod-function': true,
        'lab-function': true,
        'oklab-function': true,
        'logical-properties-and-values': true,
        'focus-visible-pseudo-class': true,
        'focus-within-pseudo-class': true,
        'any-link-pseudo-class': true,
        'matches-pseudo-class': true,
        'not-pseudo-class': true,
        'image-set-function': true,
        'prefers-color-scheme-query': true,
        'prefers-reduced-motion-query': true,
        'gap-properties': true,
        'overflow-shorthand': true,
        'place-properties': true,
        'break-properties': true,
        'font-variant-property': true
      },
      browsers: [
        'defaults',
        'not IE 11',
        'not op_mini all',
        'maintained node versions'
      ],
      autoprefixer: {
        flexbox: 'no-2009',
        grid: 'autoplace'
      }
    }),

    // Add vendor prefixes
    require('autoprefixer')({
      flexbox: 'no-2009',
      grid: 'autoplace',
      cascade: true
    }),

    // Production optimizations
    ...(process.env.NODE_ENV === 'production' ? [
      // Optimize CSS
      require('cssnano')({
        preset: ['default', {
          // Preserve important comments
          discardComments: {
            removeAll: false
          },
          // Optimize animations
          reduceIdents: {
            keyframes: false
          },
          // Preserve z-index values
          zindex: false,
          // Preserve font weights
          minifyFontValues: {
            removeQuotes: false
          },
          // Normalize whitespace but preserve formatting
          normalizeWhitespace: {
            exclude: false
          },
          // Sort media queries
          sortMediaQueries: true,
          // Merge longhand properties
          mergeLonghand: true,
          // Merge rules
          mergeRules: true,
          // Optimize calc() expressions  
          calc: {
            precision: 5
          },
          // Optimize color values
          colormin: true,
          // Convert values where possible
          convertValues: {
            length: false, // Keep original units for better debugging
            angle: false,
            time: false
          },
          // Minimize selectors
          minifySelectors: true,
          // Remove unused CSS
          discardUnused: {
            fontFace: false, // Keep font faces
            keyframes: false, // Keep keyframes  
            variables: false // Keep CSS custom properties
          }
        }]
      }),

      // Critical CSS extraction (optional)
      require('postcss-critical-css')({
        preserve: true,
        minify: true
      })
    ] : []),

    // Development helpers
    ...(process.env.NODE_ENV === 'development' ? [
      // Add helpful comments
      require('postcss-reporter')({
        clearReportedMessages: true,
        throwError: false
      })
    ] : [])
  ]
};

// Environment-specific configurations
if (process.env.NODE_ENV === 'production') {
  // Add production-specific plugins
  module.exports.plugins.push(
    // Remove unused CSS (if using PurgeCSS)
    // require('@fullhuman/postcss-purgecss')({
    //   content: [
    //     './index.html',
    //     './js/**/*.js'
    //   ],
    //   defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    //   safelist: {
    //     standard: ['html', 'body'],
    //     deep: [/^animate-/, /^is-/, /^has-/],
    //     greedy: [/^nav/, /^btn/, /^form/]
    //   }
    // })
  );
}

// Add custom plugins for specific features
module.exports.plugins.push(
  // Inline small assets
  require('postcss-url')({
    filter: '**/*.svg',
    url: 'inline',
    optimizeSvgEncode: true,
    maxSize: 10 // Inline SVGs smaller than 10KB
  }),

  // Add CSS stats for analysis
  ...(process.env.ANALYZE === 'true' ? [
    require('postcss-reporter')({
      clearReportedMessages: true,
      noIcon: true,
      formatter: (input) => {
        console.log('\n📊 CSS Analysis Report:');
        console.log(`- Total rules: ${input.messages.length}`);
        console.log(`- File: ${input.source}\n`);
        return '';
      }
    })
  ] : [])
);