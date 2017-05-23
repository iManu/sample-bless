'use strict';

exports.config = {
  //fileListInterval: 100,
  //persistent: true,
  usePolling: true,
  //useFsEvents: false,
  awaitWriteFinish: false,
  paths: {
    'public' : 'web',
    'watched' : ['src/less', 'src/js']
  },
  modules: {
    // We don't use commonJS or AMD
    wrapper: false,
    definition: false
  },
  npm : {
    enabled: false
  },
  files: {
    javascripts: {
      joinTo: {
        'js/main.js' : /^src\/js\/main/,
      },
      order : {
        before: [
          'src/js/main/jquery.min.js',
        ]
      }
    },
    stylesheets: {
      joinTo: {
        'css/style.css' : /^src\/less\/style\.less/,
        'css/print.css' : /^src\/less\/print\.less/
      }
    }
  },
  conventions: {
    ignored: [
      /\/_/, // File beginning by "_" like _settings.scss
      /^src\/js\/_old/,
      /^src\/less\/styles/,
      /^src\/less\/vars\.less/,
      /^src\/less\/pages/
    ]
  },
  plugins: {
    autoReload : {
      enabled : {
        css : false,
        js: false,
        assets : false
      }
    },
    bless: {
        cacheBuster: true,
        cleanup: true,
        compress: true,
        force: true,
        imports: true,
        outputDirectory: './web/css/' // Output directory for blessed css files.
    },
    postcss: {
      processors: [
        require('autoprefixer')(['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']),
        require('csswring')({
          preserveHacks: true
        }),
        require('postcss-url')({
          url: 'inline',
          filter: '**/*.svg',
          maxSize: 5
        }),
        //require("css-mqpacker")(),
        //require("postcss-merge-longhand")(),
        //require("postcss-merge-rules")()
      ]
    }
  },
  overrides : {
    dev : {
      optimize: false,
      sourceMaps: true,
      plugins: {
        eslint: {
            pattern: /^src\/js\/online\/.*\.js?$/,
            warnOnly: true
        }
      }
    },
    prod : {
      // optimize: true,
      sourceMaps: false,
      files: {
        javascripts: {
          joinTo: {
            'js/main.min.js' : /^src\/js\/main/,
          },
          order : {
            before: [
              'src/js/main/jquery.min.js',
            ]
          }
        },
        stylesheets: {
          joinTo: {
            'css/style.min.css' : /^src\/less\/style\.less/,
            'css/print.css' : /^src\/less\/print\.less/
          }
        }
      },
      plugins: {
        uglify: {
          mangle: true,
          compress: {
            global_defs: {
              DEBUG: false
            }
          }
        }
      }
    }
  }
};
