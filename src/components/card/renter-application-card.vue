// writen by xyh
<template>
  <div>
    <el-card class="card"
             style="font-size:24px;">
      申请成为出租者 </el-card>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-form-item label='ID'>
          <el-input v-model="id"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='申请人'>
          <el-input v-model="data.applicant"
                    :disabled="true"
                    style="width:80%;"></el-input>
          <el-button type='primary'
                     style="margin-left:20px;"
                     @click="enterUser(data.applicant)">查看申请人</el-button>
        </el-form-item>
        <el-form-item label='创建时间'>
          <el-input v-model="data.created_at"
                    :disabled="true"></el-input>

        </el-form-item>
        <el-form-item label='描述'>
          <el-input v-model="data.description"
                    type='textarea'
                    :disabled="!isAdmin"></el-input>
        </el-form-item>
        <el-form-item label='评价'>
          <el-input v-model="data.comments"
                    type='textarea'
                    :disabled="!isAdmin"></el-input>
        </el-form-item>
        <el-form-item label='状态'>
          <!-- <el-input v-model="data.status"
                    :disabled="diseditable"></el-input> -->
          <el-select v-model="data.status"
                     :disabled="true">
            <el-option v-for="item in status_options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <change-button :id="id"
                     :data="data"
                     target="renter-application"></change-button>
      <rej-button :id="id"
                  target="renter-application"
                  :comments="data.comments"
                  v-if="data.status==='UNA'||data.status==='ACC'"></rej-button>
      <approve-button :id="id"
                      :comments="data.comments"
                      target="renter-application"
                      v-if="data.status==='UNA'||data.status==='REJ'"></approve-button>
      <del-button :id="id"
                  target="renter-application"></del-button>
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
      data: {
        id: 1,
        created_at: '',
        description: '',
        status: 'ACC',
        comments: '',
        applicant: 2
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
      isAdmin: this.$store.getters.isAdmin
    }
  },
  created: function () {
    if (this.id === -1) return
    axios.get('/api/v1/renter-application/' + this.id, {
      headers: {
        Authorization: 'Token ' + this.$store.getters.getUserKey
      }
    })
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
