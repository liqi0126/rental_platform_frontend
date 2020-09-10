<template>
  <el-button type="success"
             @click="ret">归还
  </el-button>
</template>

<script>
import Axios from 'axios'
export default {
  props: {
    id: Number
  },
  methods: {
    ret: function () {
      Axios.post('/api/v1/rent-application/' + this.id + '/return')
        .then(() => {
          this.$message('归还成功')
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
