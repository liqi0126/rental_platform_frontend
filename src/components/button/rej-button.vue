<template>
  <el-button type="danger"
             @click="rej">删除
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
      Axios.post('api/v1/' + this.target + '/' + this.id + '/reject')
        .then(() => {
          this.$message('拒绝成功')
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
