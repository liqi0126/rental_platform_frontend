// writen by xyh
<template>
  <div>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-form-item label='ID'>
          <el-input v-model="id"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='申请人'>
          <el-input v-model="data.applicant"
                    :disabled="diseditable"
                    style="width:80%;"></el-input>
          <el-button type='primary'
                     style="margin-left:20px;"
                     @click="enterUser(data.applicant)">查看申请人</el-button>
        </el-form-item>
        <el-form-item label='创建时间'>
          <el-input v-model="data.created_at"
                    :disabled="diseditable"></el-input>

        </el-form-item>
        <el-form-item label='评价'>
          <el-input v-model="data.comments"
                    type='textarea'
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='状态'>
          <el-input v-model="data.status"
                    :disabled="diseditable"></el-input>
        </el-form-item>
      </el-form>
      <el-button class='button'
                 type="primary">提交修改</el-button>
    </el-card>
  </div>
</template>

<style scoped>
.button {
  margin-top: 30px;
  left: 10%;
  position: relative;
}
.card {
  width: 60%;
  position: relative;
  margin: auto;
}
.form {
  position: relative;
  margin: auto;
  width: 90%;
}
</style>

<script>
/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios'
export default {
  props: {
    id: Number
  },
  data: function () {
    return {
      diseditable: true,
      data: {
        id: 1,
        created_at: '2020-09-09T10:07:21.597849+08:00',
        description: ' 五花大绑青剑湖我都不急',
        status: 'ACC',
        comments: '',
        applicant: 2
      }
    }
  },
  created: function () {
    if (this.id === -1) return
    axios.get('/api/v1/renter-application/' + this.id, {})
      .then((response) => {
        this.data = response.data
      })
      .catch((error) => {
        alert(error)
      })
  },
  methods: {
    enterEquipment: function (id) {
      this.$router.push({ name: 'equipment', params: { equipmentId: id } })
    },
    enterUser: function (id) {
      this.$router.push({ name: 'user', params: { userId: id } })
    }
  }
}
</script>
