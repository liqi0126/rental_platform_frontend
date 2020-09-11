<template>
  <el-button type="warning"
             @click="rej">拒绝
  </el-button>
</template>

<script>
import Axios from 'axios'
import qs from 'qs'
export default {
  props: {
    id: Number,
    target: String,
    comments: String
  },
  methods: {
    rej: function () {
      Axios.post('/api/v1/' + this.target + '/' + this.id + '/reject/', qs.stringify({ comments: this.comments }))
        .then(() => {
          location.reload()
          this.$message('拒绝成功')
          // this.$router.push({ name: 'admin' })
        })
        .catch((error) => {
          console.log(error.response)
          alert('ERROR:' + error)
        })
    }
  }
}
</script>
