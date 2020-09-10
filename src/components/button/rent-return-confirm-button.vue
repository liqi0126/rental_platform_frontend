<template>
  <el-button type="danger"
             @click="rej">确认已归还
  </el-button>
</template>

<script>
import Axios from 'axios'
export default {
  props: {
    id: Number
  },
  methods: {
    del: function () {
      Axios.post('api/v1/rent-application/' + this.id + '/return/confirm')
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
