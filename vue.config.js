module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.106:8000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
