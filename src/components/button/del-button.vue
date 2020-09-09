<template>
  <el-button type="danger"
             @click="del">删除设备
  </el-button>
</template>

<script>
import Axios from 'axios'
export default {
  props: {
    id: Number,
    target: String
  },
  methods: {
    del: function () {
      Axios.delete('api/v1/' + this.target + '/' + this.id)
        .then(() => {
          this.$message('删除成功')
          this.$router.push({ name: 'admin' })
        })
        .catch((error) => {
          console.log(error.response)
          alert('ERROR:' + error)
        })
    }
  }
}
</script>
