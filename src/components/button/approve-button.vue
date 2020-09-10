<template>
  <el-button type="success"
             @click="approve">通过
  </el-button>
</template>

<script>
import Axios from 'axios'
export default {
  props: {
    id: Number,
    target: String,
    comments: String
  },
  methods: {
    approve: function () {
      console.log(this.comments)
      Axios({
        url: '/api/v1/' + this.target + '/' + this.id + '/approve/',
        method: 'post',
        data: {
          comments: this.comments
        }
      })
        .then((response) => {
          this.$message('通过成功')
          console.log(response)
          // this.$router.push({ name: 'admin' })
          // location.reload()
        })
        .catch((error) => {
          console.log(error.response)
          alert('ERROR:' + error)
        })
    }
  }
}
</script>
