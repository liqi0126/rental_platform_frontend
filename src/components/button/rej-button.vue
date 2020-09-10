<template>
  <el-button type="danger"
             @click="rej">拒绝
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
    rej: function () {
      Axios.post('/api/v1/' + this.target + '/' + this.id + '/reject')
        .then(() => {
          this.$message('拒绝成功')
          // this.$router.push({ name: 'admin' })
          location.reload()
        })
        .catch((error) => {
          console.log(error.response)
          alert('ERROR:' + error)
        })
    }
  }
}
</script>
