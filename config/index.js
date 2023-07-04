import Components from 'unplugin-vue-components/webpack';
const path = require('path')

const NutUIResolver = () => {
  return (name) => {
    if (name.startsWith('Nut')) {
      const partialName = name.slice(3);
      return {
        name: partialName,
        from: '@nutui/nutui-taro',
        sideEffects: `@nutui/nutui-taro/dist/packages/${partialName.toLowerCase()}/style`
      }
    }
  }
}

const config = {
  projectName: 'bdt_mp',
  date: '2023-2-15',
  designWidth (input) {
    if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
      // nutui宽度375
      return 375
    }
    // 设计图宽度375，如果设计图为750，这里要return 750
    return 375
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['taro-plugin-pinia','@tarojs/plugin-html', path.resolve(__dirname, "../util/modifyAssets")],
  defineConstants: {
  },
  copy: {
    patterns: [
      {
        from: "src/tt/package.json",
        to: "dist/package.json",
      },
    ],
    options: {
    }
  },
  framework: 'vue3',
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false }
  }, 
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  sass:{
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`
  },
  mini: {
    webpackChain(chain) {
      chain.plugin('unplugin-vue-components').use(Components({
        resolvers: [NutUIResolver()]
      }))
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          // selectorBlackList: ['nut-']
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true
    },
  },
  h5: {
    webpackChain(chain) {
      chain.plugin('unplugin-vue-components').use(Components({
        resolvers: [NutUIResolver()]
      }))
    },
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['nutui-taro', 'icons-vue-taro'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  alias: {
    '@/api': path.resolve(__dirname, '..', 'src/api'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/pages': path.resolve(__dirname, '..', 'src/pages'),
    '@/pagesub': path.resolve(__dirname, '..', 'src/pagesub'),
    '@/stores': path.resolve(__dirname, '..', 'src/stores'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/router': path.resolve(__dirname, '..', 'src/router'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
