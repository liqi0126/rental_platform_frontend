// writen by xyh
<template>
  <div>
    <el-card class="card"
             style="font-size:24px;">
      设备上架申请
    </el-card>
    <el-card class='card'>
      <el-form class="form"
               label-width="100px">
        <el-form-item label='ID'>
          <el-input v-model="id"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='拥有者ID'>
          <el-input v-model="data.owner"
                    :disabled="true"
                    style="width:80%;"></el-input>
          <el-button type="primary"
                     style="margin-left:20px;"
                     @click="enterUser(row)">查看拥有者</el-button>
        </el-form-item>
        <el-form-item label='创建时间'>
          <el-input v-model="data.created_at"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label='状态'>
          <!-- <el-input v-model="data.status"
                    :disabled="diseditable"></el-input> -->
          <el-select v-model="data.status"
                     :disabled="!isAdmin">
            <el-option v-for="item in status_options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='描述'>
          <el-input v-model="data.description"
                    type='textarea'
                    :disabled="!(isAdmin||isOwner)"></el-input>
        </el-form-item>
        <el-form-item label='审核者评价'>
          <el-input v-model="data.comments"
                    type='textarea'
                    :disabled="!(isAdmin||isOwner)"></el-input>
        </el-form-item>
        <el-form-item label='设备ID'>
          <el-input v-model="data.equipment"
                    :disabled="true"
                    style="width:80%;"></el-input>
          <el-button type="primary"
                     style="margin-left:20px;"
                     @click="enterEquipment">查看设备</el-button>
        </el-form-item>
      </el-form>
      <change-button :id="id"
                     :data="data"
                     target="release-application"
                     v-if="(isAdmin||isOwner)"></change-button>
      <rej-button :id="id"
                  target="release-application"
                  :comments="data.comments"
                  v-if="isAdmin"></rej-button>
      <approve-button :id="id"
                      :comments="data.comments"
                      target="release-application"
                      v-if="isAdmin"></approve-button>
      <del-button :id="id"
                  target="release-application"
                  v-if="(isAdmin||isOwner)"></del-button>
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
      isOwner: (this.id === this.$store.getters.getCurrentUser.id),
      isAdmin: this.$store.getters.isAdmin,
      data: {
        id: 0,
        comments: '',
        created_at: '',
        description: '',
        equipment: '',
        status: '',
        owner: 0
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
      }]
    }
  },
  created: function () {
    axios.get('/api/v1/release-application/' + this.id, {
      headers: {
        Authorization: 'Token ' + this.$store.getters.getUserKey
      }
    })
      .then((response) => {
        this.data = response.data
      })
      .catch((error) => {
        console.log(error.response)
        this.$alert(error.response.data)
      })
  },
  methods: {
    enterUser: function () {
      this.$router.push({ name: 'user', params: { userId: this.data.owner } })
    },
    enterEquipment: function () {
      this.$router.push({ name: 'equipment', params: { equipmentId: this.data.equipment } })
    }
  }
}
</script>
