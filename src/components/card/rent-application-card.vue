// writen by xyh
<template>
  <div>
    <el-card class="card"
             style="font-size:24px;">
      申请租借设备
    </el-card>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-form-item label='ID'>
          <el-input v-model="id"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='创建时间'>
          <el-input v-model="rent_data.created_at"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='描述'>
          <el-input v-model="rent_data.description"
                    type='textarea'
                    :disabled="!(isAdmin||isborrower)"></el-input>
        </el-form-item>
        <el-form-item label='出租者审批评价'>
          <el-input v-model="rent_data.comments"
                    type='textarea'
                    :disabled="!(isAdmin||isrenter)"></el-input>
        </el-form-item>
        <el-form-item label='租用者评价'>
          <el-input v-model="rent_data.user_comments"
                    type='textarea'
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='状态'>
          <!-- <el-input v-model="data.status"
                    :disabled="diseditable"></el-input> -->
          <el-select v-model="rent_data.status"
                     :disabled="!isAdmin">
            <el-option v-for="item in status_options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='租期'>
          <el-input v-model="rent_data.lease_term_begin"
                    :disabled="!isAdmin"
                    style="width:48%"></el-input>
          到
          <el-input v-model="rent_data.lease_term_end"
                    :disabled="!isAdmin"
                    style="width:48%"></el-input>
        </el-form-item>
        <el-form-item label='设备ID'>
          <el-input v-model="rent_data.equipment"
                    :disabled="true"
                    style="width:80%;"></el-input>
          <el-button type='primary'
                     @click="enterEquipment(rent_data.equipment)"
                     style="margin-left:20px;">查看设备</el-button>
        </el-form-item>
        <el-form-item label='拥有者ID'>
          <el-input v-model="rent_data.renter"
                    :disabled="true"
                    style="width:80%;"></el-input>
          <el-button type='primary'
                     @click="enterUser(rent_data.renter)"
                     style="margin-left:20px;">查看拥有者</el-button>
        </el-form-item>
        <el-form-item label='租借者ID'>
          <el-input v-model="rent_data.borrower"
                    :disabled="true"
                    style="width:80%;"></el-input>
          <el-button type='primary'
                     @click="enterUser(rent_data.borrower)"
                     style="margin-left:20px;">查看租借者</el-button>
        </el-form-item>
      </el-form>
      <change-button :id="id"
                     :data="rent_data"
                     target="rent-application"
                     v-if="isAdmin"></change-button>
      <rej-button :id="id"
                  target="rent-application"
                  :comments="rent_data.comments"
                  v-if="(isAdmin||isrenter)&&rent_data.status==='UNA'"></rej-button>
      <approve-button :id="id"
                      target="rent-application"
                      :comments="rent_data.comments"
                      v-if="(isAdmin||isrenter)&&rent_data.status==='UNA'"></approve-button>

      <del-button :id="id"
                  target="rent-application"
                  v-if="isAdmin||(isborrower&&rent_data.status==='UNA')"></del-button>
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
import changeButton from '../button/change-button'
import rejButton from '../button/rej-button'
import approveButton from '../button/approve-button'
import delButton from '../button/del-button'
export default {
  components: {
    'change-button': changeButton,
    'rej-button': rejButton,
    'approve-button': approveButton,

    'del-button': delButton
  },
  props: {
    id: Number
  },
  data: function () {
    return {
      diseditable: true,
      rent_data: {
        created_at: '',
        description: 'wdjq',
        status: 'REJ',
        comments: '',
        applying: false,
        lease_term_begin: null,
        lease_term_end: null,
        user_comments: null,
        equipment: 2,
        renter: 1,
        borrower: 3
      },
      status_options: [{
        value: 'UNA',
        label: 'Unapproved'
      }, {
        value: 'ACC',
        label: 'Accepted'
      }, {
        value: 'REJ',
        label: 'Rejected'
      }],
      // eslint-disable-next-line eqeqeq
      isrenter: false,
      // eslint-disable-next-line eqeqeq
      isborrower: false,
      isAdmin: this.$store.getters.isAdmin
    }
  },
  created: function () {
    axios.get('/api/v1/rent-application/' + this.id, {
      headers: {
        Authorization: 'Token ' + this.$store.getters.getUserKey
      }
    })
      .then((response) => {
        this.rent_data = response.data
        this.isrenter = this.rent_data.renter === this.$store.getters.getCurrentUser.id
        this.isborrower = this.rent_data.borrower === this.$store.getters.getCurrentUser.id
        console.log(this.isborrower)
      })
      .catch((error) => {
        this.$alert(error.response.data)
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
