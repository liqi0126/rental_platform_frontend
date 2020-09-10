// writen by xyh
<template>
  <div>
    <el-card class="card"
             style="font-size:24px;">
      用户详情页
    </el-card>

    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-form-item label='ID'>
          <el-input v-model="id"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='姓名'>
          姓
          <el-input v-model="data.last_name"
                    style="width:45%;"
                    :disabled="!(isOwner||isAdmin)"></el-input>
          名
          <el-input v-model="data.first_name"
                    :disabled="!(isOwner||isAdmin)"
                    style="width:45%;"></el-input>
        </el-form-item>
        <el-form-item label='设备'>
          <el-collapse accordion>
            <el-collapse-item title="设备"
                              name="1">
              <equipment-table :id="id"></equipment-table>
            </el-collapse-item>
            <el-collapse-item title="租赁请求"
                              name="2">
              <rent-application-table :id="id"></rent-application-table>
            </el-collapse-item>
          </el-collapse>
        </el-form-item>
        <el-form-item label='密码'
                      v-if="(isOwner||isAdmin)">
          <el-input v-model="data.password"></el-input>
        </el-form-item>
        <el-form-item label='创建时间'>
          <el-input v-model="data.created_at"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='上次登陆时间'>
          <el-input v-model="data.last_login"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='地址'>
          <el-input v-model="data.address"
                    :disabled="!(isOwner||isAdmin)"></el-input>
        </el-form-item>
        <el-form-item label='Email'>
          <el-input v-model="data.email"
                    :disabled="!(isOwner||isAdmin)"></el-input>
        </el-form-item>
        <el-form-item label='电话号码'>
          <el-input v-model="data.phone"
                    :disabled="!(isOwner||isAdmin)"></el-input>
        </el-form-item>
        <el-form-item label='属性'>
          <el-checkbox v-model="data.is_renter"
                       :disabled="!isAdmin">是租借者</el-checkbox>
          <el-checkbox v-model="data.is_staff"
                       :disabled="!isAdmin">是工作人员</el-checkbox>
          <el-checkbox v-model="data.is_active"
                       :disabled="!isAdmin">可登录</el-checkbox>
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
import equipmentTable from '../table/equipment-table'
import rentApplicationTable from '../table/rent-application-table'
export default {
  components: {
    'equipment-table': equipmentTable,
    'rent-application-table': rentApplicationTable
  },
  props: {
    id: Number
  },
  data: function () {
    return {
      isOwner: (this.id === this.$store.getters.getCurrentUser.id),
      isAdmin: this.$store.getters.isAdmin,
      data: {
        id: 0,
        owned_equipments: [],
        password: '',
        last_login: null,
        is_superuser: false,
        first_name: '',
        last_name: '',
        email: '',
        is_staff: false,
        is_active: true,
        date_joined: '',
        created_at: '',
        address: '',
        phone: '',
        is_renter: false,
        groups: [],
        user_permissions: []
      }
    }
  },
  created: function () {
    if (this.id === -1) return
    axios.get('/api/v1/user/' + this.id, {})
      .then((response) => {
        this.data = response.data
      })
      .catch((error) => {
        alert(error)
      })
  },
  methods: {
    enterEquipment: function (row) {
      this.$router.push({ name: 'equipment', params: { equipmentId: row.id } })
    }
  }
}
</script>
