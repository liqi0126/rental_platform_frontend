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
    target: String
  },
  methods: {
    approve: function () {
      Axios.post('/api/v1/' + this.target + '/' + this.id + '/approve')
        .then(() => {
          this.$message('通过成功')
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
