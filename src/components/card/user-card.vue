// writen by xyh
<template>
  <div>
    <el-card class="card"
             style="font-size:24px;">
      用户详情页
    </el-card>
    <chat-dialog ref="dialog"
                 :myId="this.$store.getters.getCurrentUser.id"
                 :opposite="id"
                 :name="data.last_name+' '+data.first_name"
                 :dialogVisible.sync="dialogVisible"></chat-dialog>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-form-item label='ID'>
          <el-input v-model="id"
                    :disabled="true"
                    style="width:70%;"></el-input>
          <el-button type="primary"
                     @click="openDialog">和他对话</el-button>
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
        <el-form-item label='设备及请求'>
          <el-collapse accordion>
            <el-collapse-item title="设备"
                              name="1">
              <equipment-table :id="id"
                               :pageSize=5
                               :height=400></equipment-table>
            </el-collapse-item>
            <el-collapse-item title="租赁请求"
                              name="2">
              <rent-application-table :id="id"
                                      :pageSize=5
                                      :height=400></rent-application-table>
            </el-collapse-item>
            <el-collapse-item title="申请成为出租者请求"
                              name="3">
              <renter-application-table :id="id"
                                        :pageSize=5
                                        :height=400></renter-application-table>
            </el-collapse-item>
            <el-collapse-item title="上架请求"
                              name="4">
              <release-application-table :id="id"
                                         :pageSize=5
                                         :height=400></release-application-table>
            </el-collapse-item>
            <el-collapse-item title="收到的租赁请求"
                              name="5">
              <received-rent-application-table :userId="id"
                                               :pageSize=5
                                               :height=400></received-rent-application-table>

            </el-collapse-item>
            <el-collapse-item title="租借的设备"
                              name="6">
              <rented-equipment-table :userId="id"
                                      :pageSize=5
                                      :height=400></rented-equipment-table>
            </el-collapse-item>
          </el-collapse>
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
                       :disabled="!isAdmin">是出租者</el-checkbox>
          <el-checkbox v-model="data.is_staff"
                       :disabled="!isAdmin">是工作人员</el-checkbox>
          <el-checkbox v-model="data.is_active"
                       :disabled="!isAdmin">可登录</el-checkbox>
        </el-form-item>
      </el-form>
      <change-button :id="id"
                     :data="data"
                     target="user"></change-button>
      <del-button :id="id"
                  target="user"
                  v-if="isAdmin"></del-button>
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
import renterApplicationTable from '../table/renter-application-table'
import releaseApplicationTable from '../table/release-application-table'
import receivedRentApplicationTable from '../table/received-rent-application-table'
import rentedEquipmentTable from '../table/rented-equipment-table'
import changeButton from '../button/change-button'
import delButton from '../button/del-button'
import chat from '../chat'
export default {
  components: {
    'equipment-table': equipmentTable,
    'rent-application-table': rentApplicationTable,
    'renter-application-table': renterApplicationTable,
    'release-application-table': releaseApplicationTable,
    'received-rent-application-table': receivedRentApplicationTable,
    'rented-equipment-table': rentedEquipmentTable,
    'change-button': changeButton,
    'del-button': delButton,
    'chat-dialog': chat
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
      },
      dialogVisible: false
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
    },
    openDialog: function () {
      this.dialogVisible = false
      this.dialogVisible = true
    }
  }
}
</script>
