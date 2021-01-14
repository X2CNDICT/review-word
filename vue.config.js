module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      const externals = {
        vue: 'Vue',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        xlsx: 'XLSX',
        lodash: '_',
      };
      config.externals(externals);
      const cdn = {
        js: [
          // vue
          'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
          // vue-router
          'https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js',
          // vuex
          'https://cdn.bootcdn.net/ajax/libs/vuex/3.5.1/vuex.min.js',
          // element-ui js
          'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js',
          // xlsx
          'https://unpkg.com/xlsx/dist/xlsx.full.min.js',
          // lodash
          'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.20/lodash.min.js',
        ],
      };
      // 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
      config.plugin('html-index')
        .tap((args) => {
          // eslint-disable-next-line no-param-reassign
          args[0].cdn = cdn;
          return args;
        });
    }
  },
};
