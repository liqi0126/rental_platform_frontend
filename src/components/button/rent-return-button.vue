<template>
  <el-button type="success"
             @click="ret">归还
  </el-button>
</template>

<script>
import Axios from 'axios'
import qs from 'qs'
export default {
  props: {
    id: Number,
    comments: String
  },
  methods: {
    ret: function () {
      // eslint-disable-next-line @typescript-eslint/camelcase
      Axios.post('/api/v1/rent-application/' + this.id + '/return/', qs.stringify({ user_comments: this.comments }), {
        headers: {
          Authorization: 'Token ' + this.$store.getters.getUserKey
        }
      })
        .then(() => {
          location.reload()
          this.$message('归还成功')
        })
        .catch((error) => {
          console.log(error.response)
          alert('ERROR:' + error)
        })
    }
  }
}
</script>
