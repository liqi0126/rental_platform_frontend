<template>
  <el-button type="success"
             @click="confirm">确认已归还
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
    confirm: function () {
      Axios.post('/api/v1/rent-application/' + this.id + '/return/confirm/', qs.stringify({ comments: this.comments }))
        .then(() => {
          this.$message('归还确认成功')
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
