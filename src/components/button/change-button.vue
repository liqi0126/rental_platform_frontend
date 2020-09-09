<template>
  <el-button type="danger"
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
      console.log(this.data)
      Axios.patch('/api/v1/' + this.target + '/' + this.id, this.data)
        .then(() => {
          this.$message('修改成功')
          this.$router.push({ name: 'admin' })
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
