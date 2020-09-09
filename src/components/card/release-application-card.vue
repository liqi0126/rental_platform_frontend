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
        <el-form-item label='拥有者ID'>
          <el-input v-model="data.owner"
                    :disabled="diseditable"
                    style="width:80%;"></el-input>
          <el-button type="primary"
                     style="margin-left:20px;"
                     @click="enterUser(row)">查看拥有者</el-button>
        </el-form-item>
        <el-form-item label='创建时间'>
          <el-input v-model="data.created_at"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='状态'>
          <el-input v-model="data.status"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='设备ID'>
          <el-input v-model="data.equipment"
                    :disabled="diseditable"
                    style="width:80%;"></el-input>
          <el-button type="primary"
                     style="margin-left:20px;"
                     @click="enterEquipment(row)">查看拥有者</el-button>
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
  margin-top: 40px;
  width: 60%;
  position: relative;
  margin: 20px auto;
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
        id: 0,
        name: '',
        created_at: '',
        description: '',
        equipment: '',
        status: '',
        owner: 0
      }
    }
  },
  created: function () {
    axios.get('/api/v1/release-application/' + this.id)
      .then((response) => {
        this.data = response.data
      })
      .catch((error) => {
        console.log(error.response)
        alert(error)
      })
  },
  methods: {
    enterUser: function () {
      this.$router.push({ name: 'user', params: { userId: this.data.owner } })
    },
    enterEquipment: function (row) {
      this.$router.push({ name: 'equipment', params: { equipmentId: row.id } })
    }
  }
}
</script>
