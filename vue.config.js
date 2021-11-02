module.exports = {
    "configureWebpack": {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'views': '@/views',
                'router': '@/router'
            }
        }
    },


    "devServer": {
        port: 8082,
        open: true,
        // 解决跨域问题,设置代理服务
        proxy: {
            "/api": {
                target: "https://autumnfish.cn",
                // 允许跨域
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ''
                }
            }
        }
    }
}