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
        <el-form-item label='用户名'>
          <el-input v-model="data.username"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='设备'>
          <el-table :data="data.owned_equipments"
                    stripe
                    id="equipment-table"
                    class="table">
            <el-table-column prop="id"
                             label="ID"
                             width="40">
            </el-table-column>
            <el-table-column prop="name"
                             label="设备名"
                             width="180">
            </el-table-column>
            <el-table-column prop="created_at"
                             label="上架时间"
                             width="180">
            </el-table-column>
            <el-table-column prop="address"
                             label="地址"
                             width="180">
            </el-table-column>
            <el-table-column prop="email"
                             label="Email"
                             width="180">
            </el-table-column>
            <el-table-column prop="phone"
                             label="电话号码"
                             width="180">
            </el-table-column>
            <el-table-column prop="status"
                             label="状态"
                             width="180">
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label='密码'
                      v-if="!diseditable">
          <el-input v-model="data.password"></el-input>
        </el-form-item>
        <el-form-item label='创建时间'>
          <el-input v-model="data.created_at"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='上次登陆时间'>
          <el-input v-model="data.last_login"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='地址'>
          <el-input v-model="data.address"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='Email'>
          <el-input v-model="data.email"
                    :disabled="diseditable"></el-input>
        </el-form-item>
        <el-form-item label='电话号码'>
          <el-input v-model="data.phone"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='属性'>
          <el-checkbox v-model="data.is_renter"
                       :disabled="diseditable">是租借者</el-checkbox>
          <el-checkbox v-model="data.is_staff"
                       :disabled="diseditable">是工作人员</el-checkbox>
          <el-checkbox v-model="data.is_active"
                       :disabled="diseditable">可登录</el-checkbox>
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
        id: 0,
        owned_equipments: [],
        password: '',
        last_login: null,
        is_superuser: false,
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        is_staff: false,
        is_active: true,
        date_joined: '',
        created_at: '',
        address: '',
        phone: '',
        is_renter: true,
        groups: [],
        user_permissions: []
      }
    }
  },
  created: function () {
    axios.get('/api/v1/users/' + this.id, {})
      .then((response) => {
        this.data = response.data
      })
      .catch((error) => {
        alert(error)
      })
  }
}
</script>
