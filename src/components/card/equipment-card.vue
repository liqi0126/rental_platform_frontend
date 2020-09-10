// writen by xyh
<template>
  <div>
    <el-card class="card">
      设备详情页
    </el-card>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-form-item label='ID'>
          <el-input v-model="id"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='设备名'>
          <el-input v-model="my_data.name"
                    :disabled="!(isAdmin||isOwner)"></el-input>
        </el-form-item>
        <el-form-item label='拥有者ID'>
          <el-input v-model="my_data.owner"
                    :disabled="!(isAdmin)"
                    style="width:80%;"></el-input>
          <el-button type="primary"
                     style="margin-left:20px;"
                     @click="enterUser(row)">查看拥有者</el-button>
        </el-form-item>
        <el-form-item label='创建时间'>
          <el-input v-model="my_data.created_at"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='地址'>
          <el-input v-model="my_data.address"
                    :disabled="!(isAdmin||isOwner)"></el-input>
        </el-form-item>
        <el-form-item label='状态'>
          <!-- <el-input v-model="my_data.status"
                    :disabled="diseditable"></el-input> -->
          <el-select v-model="my_data.status"
                     :disabled="!(isAdmin)">
            <el-option v-for="item in status_options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='租期'>
          <el-input v-model="my_data.lease_term_begin"
                    :disabled="!(isAdmin)"
                    style="width:48%"></el-input>
          到
          <el-input v-model="my_data.lease_term_end"
                    :disabled="!(isAdmin)"
                    style="width:48%"></el-input>
        </el-form-item>
        <el-form-item label='Email'>
          <el-input v-model="my_data.email"
                    :disabled="!(isAdmin||isOwner)"></el-input>
        </el-form-item>
        <el-form-item label='电话号码'>
          <el-input v-model="my_data.phone"
                    :disabled="!(isAdmin||isOwner)"></el-input>
        </el-form-item>
      </el-form>
      <change-button :id="id"
                     :data="my_data"
                     target="equipment"
                     v-if="(isAdmin||isOwner)"></change-button>
      <del-button :id="id"
                  target="equipment"
                  v-if="(isAdmin||isOwner)"></del-button>
      <el-button v-if="!isOwner&&my_data.status=='AVA'"
                 type="primary"
                 @click="enterRent">申请租借</el-button>
      <el-button v-if="(isAdmin||isOwner)&&my_data.status=='UNR'"
                 type="primary"
                 @click="enterRelease">申请上架</el-button>

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
import changeButton from '../button/change-button'
import delButton from '../button/del-button'
export default {
  components: {
    'change-button': changeButton,
    'del-button': delButton
  },
  props: {
    id: Number
  },
  data: function () {
    return {
      my_data: {
        id: 0,
        name: '',
        created_at: '',
        address: '',
        email: '',
        phone: null,
        description: '',
        status: 'UNR',
        lease_term_begin: null,
        lease_term_end: null,
        user_comments: null,
        owner: 0,
        current_tenant: null

      },
      isOwner: false,
      isAdmin: this.$store.getters.isAdmin,

      status_options: [{
        value: 'UNR',
        label: 'Unreleased'
      }, {
        value: 'UNA',
        label: 'Unapproved'
      }, {
        value: 'AVA',
        label: 'Available'
      }, {
        value: 'REN',
        label: 'Rented'
      }, {
        value: 'RET',
        label: 'Returned'
      }]
    }
  },
  created: function () {
    if (this.id === -1) return
    axios.get('/api/v1/equipment/' + this.id, {})
      .then((response) => {
        this.my_data = response.data
        this.isOwner = (this.my_data.owner === this.$store.getters.getCurrentUser.id)
      })
      .catch((error) => {
        alert(error)
      })
  },
  methods: {
    enterUser: function () {
      this.$router.push({ name: 'user', params: { userId: this.my_data.owner } })
    },
    enterRelease: function () {
      this.$router.push({ name: 'create-release-application', params: { equipmentId: this.id } })
    },
    enterRent: function () {
      this.$router.push({ name: 'create-rent-application', params: { equipmentId: this.id } })
    }
  }
}
</script>
