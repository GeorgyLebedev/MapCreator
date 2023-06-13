const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // Добавляем правило для обработки PDF-файлов
    config.module
        .rule('pdf')
        .test(/\.pdf$/)
        .use('file-loader')
        .loader('file-loader')
        .options({
          name: '[name].[ext]' // Путь и имя файла после сборки
        })
  }
})
