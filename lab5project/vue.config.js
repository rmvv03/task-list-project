const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // GitHub Pages serves a project site from /<repo-name>/. The deploy
  // workflow sets PUBLIC_PATH; locally it falls back to '/'.
  publicPath: process.env.PUBLIC_PATH || '/',

  pwa: {
    name: 'TaskListApp',
    themeColor: '#9397C4'
  },

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
