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
    },
    configureWebpack: {
        resolve: {
            extensions: ['.ts', '.js', '.vue', '.json'],
        },
        entry: {
            app: './src/main.ts'
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                }
            ]
        }
    }
})
