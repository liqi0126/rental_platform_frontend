<template>
  <el-button type="primary"
             @click="change">提交修改
  </el-button>
</template>

<script>
import Axios from 'axios'
export default {
  props: {
    id: Number,
    target: String,
    data: Object
  },
  methods: {
    change: function () {
      const newData = {}
      for (const key in this.data) {
        if (this.data[key] !== '') {
          newData[key] = this.data[key]
        }
      }

      Axios.patch('/api/v1/' + this.target + '/' + this.id + '/', newData, {
        headers: {
          Authorization: 'Token ' + this.$store.getters.getUserKey
        }
      })
        .then((response) => {
          location.reload()
          this.$message('修改成功')
          // this.$router.push({ name: 'admin' })
        })
        .catch((error) => {
          console.log(error.response)
          console.log(error.request.response)
          this.$alert(error.response.data)
        })
    }
  }
}
</script>
