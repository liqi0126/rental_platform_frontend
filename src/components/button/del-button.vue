<template>
  <el-button type="danger"
             @click="del">删除
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
      Axios.delete('/api/v1/' + this.target + '/' + this.id, {
        headers: {
          Authorization: 'Token ' + this.$store.getters.getUserKey
        }
      })
        .then(() => {
          this.$router.push({ name: 'index' })
          this.$message('删除成功')
        })
        .catch((error) => {
          console.log(error.response)
          this.$alert(error.response.data)
        })
    }
  }
}
</script>
