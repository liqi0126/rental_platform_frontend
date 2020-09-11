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
        <el-form-item label='描述'>
          <el-input v-model="my_data.description"
                    :disabled="!(isAdmin||isOwner)"
                    type="textarea"></el-input>
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
        <el-form-item label='当前租借者'>
          <el-input v-model="my_data.borrower"
                    :disabled="true"
                    style="width:80%;"></el-input>
          <el-button type="primary"
                     style="margin-left:20px;"
                     @click="enterBorrower(row)">查看租借者</el-button>
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
        <el-form-item label='用户评价'>
          <el-collapse v-model="activeNames"
                       @change="handleChange">
            <el-collapse-item title="展开">
              <el-table :data="commentsList"
                        stripe
                        style="width: 200%">
                <el-table-column prop="borrower"
                                 label="用户"
                                 width="100%">
                </el-table-column>
                <el-table-column prop="comments"
                                 label="评价"
                                 width="500%">
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入归还评价"
                    v-model="user_comments"
                    type='textarea'
                    v-if="(isBorrower||isAdmin)&&my_data.status==='REN'"></el-input>
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
      <rent-return-button :id="rentAppId"
                          :comments="user_comments"
                          target="rent-application"
                          v-if="(isBorrower||isAdmin)&&my_data.status==='ACC'">

      </rent-return-button>
      <rent-return-confirm-button :id="rentAppId"
                                  target="rent-application"
                                  v-if="(isAdmin||isOwner)&&my_data.status==='REN'"></rent-return-confirm-button>
      <el-button v-if="(isAdmin||isOwner)&&my_data.status=='AVA'"
                 @click="withDrawEquipment"
                 type='warning'>下架</el-button>

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
import rentReturnButton from '../button/rent-return-button'
import rentReturnConfirmButton from '../button/rent-return-confirm-button'
export default {
  components: {
    'change-button': changeButton,
    'del-button': delButton,
    'rent-return-button': rentReturnButton,
    'rent-return-confirm-button': rentReturnConfirmButton
  },
  props: {
    id: Number
  },
  data: function () {
    return {
      activeNames: ['1'],
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
        current_tenant: null,
        borrower: -1
      },
      isOwner: false,
      isAdmin: this.$store.getters.isAdmin,
      user_comments: '',
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
      }],
      rentApplicationList: [],
      commentsList: [],
      applying: false,
      borrower: 0,
      rentAppId: 0,
      isBorrower: false,
      new_comment: null
    }
  },
  created: function () {
    if (this.id === -1) return
    axios.get('/api/v1/equipment/' + this.id, {})
      .then((response) => {
        console.log(response)
        this.my_data = response.data
        this.rentApplicationList = this.my_data.rent_applications
        this.getRentApp()
        this.getCommentsList()
        this.isOwner = (this.my_data.owner === this.$store.getters.getCurrentUser.id)
        this.isBorrower = (this.my_data.borrower === this.$store.getters.getCurrentUser.id)
      })
      .catch((error) => {
        alert(error)
      })
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    enterUser: function () {
      this.$router.push({ name: 'user', params: { userId: this.my_data.owner } })
    },
    enterRelease: function () {
      this.$router.push({ name: 'create-release-application', params: { equipmentId: this.id } })
    },
    enterRent: function () {
      this.$router.push({ name: 'create-rent-application', params: { equipmentId: this.id } })
    },
    enterBorrower: function () {
      this.$router.push({ name: 'user', params: { userId: this.my_data.owner } })
    },
    getCommentsList () {
      for (const item of this.rentApplicationList) {
        // console.log(item.borrower)
        // console.log(item.user_comments)
        // this.commentsList.push({ borrower: item.borrower, comments: item.user_comments })
        // if (item.status === 'ACC' && item.applying === true) {
        if (item.user_comments === '' || item.user_comments === null) {
          this.new_comment = '该用户暂无评价'
        } else this.new_comment = item.user_comments
        this.commentsList.push({ borrower: item.borrower, comments: this.new_comment })
        // }
      }
    },
    getRentApp: function () {
      for (const item of this.rentApplicationList) {
        if (item.applying === true) {
          this.applying = true
          this.rentAppId = item.id
          this.borrower = item.borrower
          this.my_data.lease_term_end = item.lease_term_end
          this.my_data.lease_term_begin = item.lease_term_begin
          return
        }
      }
    },
    withDrawEquipment: function () {
      axios.post('/api/v1/equipment/' + this.id + '/withdraw/')
        .then(() => {
          location.reload()
          this.$message('下架成功')
        })
        .catch((error) => {
          alert('ERROR:' + error)
          console.log(error.response)
        })
    }
  }
}
</script>
