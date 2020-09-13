module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.108:8000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
