module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.100:8000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
