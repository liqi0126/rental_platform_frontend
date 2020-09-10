<template>
  <div>
    <el-card class='card'
             style="margin-top:50px;">
      <div style="float:left;margin-right:50px;margin-left:200px;">
        <div style="text-align:center;">
          <el-progress type="circle"
                      :percentage="activeRate"
                      :width=126></el-progress>
          <h3>
            用户活跃率
          </h3>
        </div>
      </div>
      <div style="float:left;margin-right:100px;margin-left:100px;">
        <div style="text-align:center;">
          <el-progress type="circle"
                      :percentage="utilizationRate"
                      :width=126></el-progress>
          <h3>
            设备利用率
          </h3>
        </div>
      </div>
      <div style="float:left;margin-right:200px;margin-left:50px;">
        <div style="text-align:center;">
          <el-progress type="circle"
                      :percentage="approvedRate"
                      :width=126></el-progress>
          <h3>
            申请通过率
          </h3>
        </div>
      </div>
    </el-card>
    <el-card class='card'
             style="margin-top:50px;">
      <div>
        <h2 style="text-align:center;">
          用户信息
        </h2>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          当前平台用户总数: <el-tag type="warning"
                  style="float:right;margin-right:150px;font-size:20px;">{{users_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          活跃用户数量: <el-tag type="success"
                  style="float:right;margin-right:150px;font-size:20px;">{{users_active_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          租赁者数量: <el-tag
                  style="float:right;margin-right:150px;font-size:20px;">{{users_renter_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          管理员数量: <el-tag type="info"
                  style="float:right;margin-right:150px;font-size:20px;">{{users_staff_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          超级用户数量: <el-tag type="danger"
                  style="float:right;margin-right:150px;font-size:20px;">{{users_superUser_num}}</el-tag>
        </h3>
      </div>
    </el-card>

    <el-card class='card'
             style="margin-top:50px;">
      <div>
        <h2 style="text-align:center;">
          设备信息
        </h2>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          当前平台设备总数: <el-tag type="warning"
                  style="float:right;margin-right:150px;font-size:20px;">{{equipments_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          未上线设备数量: <el-tag type="danger"
                  style="float:right;margin-right:150px;font-size:20px;">{{equip_unrelased_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          待审核设备数量: <el-tag type="danger"
                  style="float:right;margin-right:150px;font-size:20px;">{{equip_unapproved_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          可租借设备数量: <el-tag type="success"
                  style="float:right;margin-right:150px;font-size:20px;">{{equip_available_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          已借出设备数量: <el-tag style="float:right;margin-right:150px;font-size:20px;">{{equip_rented_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          已归还设备数量: <el-tag type="info"
                  style="float:right;margin-right:150px;font-size:20px;">{{equip_returned_num}}</el-tag>
        </h3>
      </div>
    </el-card>
    <el-card class='card'
             style="margin-top:50px;">
      <div>
        <h2 style="text-align:center;">
          申请信息
        </h2>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          当前平台申请总数: <el-tag type="warning"
                  style="float:right;margin-right:150px;font-size:20px;">{{applications_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          设备上线申请数量: <el-tag type="info"
                  style="float:right;margin-right:150px;font-size:20px;">{{appli_release_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          成为租赁者申请数量: <el-tag type="success"
                  style="float:right;margin-right:150px;font-size:20px;">{{appli_renter_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          租赁设备申请数量: <el-tag
                  style="float:right;margin-right:150px;font-size:20px;">{{appli_rent_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          待审核申请数量: <el-tag type="warning"
                  style="float:right;margin-right:150px;font-size:20px;">{{appli_unapproved_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          已通过申请数量: <el-tag type="success"
                  style="float:right;margin-right:150px;font-size:20px;">{{appli_accepted_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          未通过申请数量: <el-tag type="danger"
                  style="float:right;margin-right:150px;font-size:20px;">{{appli_rejected_num}}</el-tag>
        </h3>
      </div>
    </el-card>
    <div>
    </div>
  </div>
</template>

<style scoped>
.el-card {
  margin-right: 10%;
  margin-left: 10%;
  margin-bottom: 5%;
}
.el-progress {
  margin-top: 5%;
  margin-right: 10%;
  margin-left: 10%;
}
</style>

<script>
/* eslint-disable @typescript-eslint/camelcase */

import Axios from 'axios'
export default {
  data: function () {
    return {
      // 用户信息
      users: [],
      users_num: null,
      users_active_num: null,
      users_renter_num: null,
      users_staff_num: null,
      users_superUser_num: null,
      activeRate: 0, // 设备利用率
      // 设备信息
      equipments: [],
      equipments_num: null,
      equip_unrelased_num: null,
      equip_unapproved_num: null,
      equip_available_num: null,
      equip_rented_num: null,
      equip_returned_num: null,
      utilizationRate: 0, // 设备利用率
      // 申请信息
      appli_release: [],
      appli_renter: [],
      appli_rent: [],
      applications_num: null,
      appli_release_num: null,
      appli_renter_num: null,
      appli_rent_num: null,
      appli_unapproved_num: null,
      appli_accepted_num: null,
      appli_rejected_num: null,
      approvedRate: 0 // 设备利用率
    }
  },

  mounted () {
    this.getUsers()
    this.getEquipments()
    this.getApplications()
  },
  methods: {
    getApplications () {
      this.applications_num = 0
      this.appli_unapproved_num = 0
      this.appli_accepted_num = 0
      this.appli_rejected_num = 0
      // release_application
      Axios({
        url: 'api/v1/release-application',
        method: 'get'
      })
        .then((response) => {
          this.appli_release = response.data.results
          this.appli_release_num = response.data.count
          this.applications_num += this.appli_release_num
          this.analysisReleaseAppli()
        })
        .catch((error) => {
          console.log(error.status)
          console.log(error.response)
        })
      // renter_application
      Axios({
        url: 'api/v1/renter-application',
        method: 'get'
      })
        .then((response) => {
          this.appli_renter = response.data.results
          this.appli_renter_num = response.data.count
          this.applications_num += this.appli_renter_num
          this.analysisRenterAppli()
        })
        .catch((error) => {
          console.log(error.status)
          console.log(error.response)
        })
      // rent_application
      Axios({
        url: 'api/v1/rent-application',
        method: 'get'
      })
        .then((response) => {
          this.appli_rent = response.data.results
          this.appli_rent_num = response.data.count
          this.applications_num += this.appli_rent_num
          this.analysisRentAppli()
        })
        .catch((error) => {
          console.log(error.status)
          console.log(error.response)
        })
    },
    getUsers () {
      Axios({
        url: 'api/v1/users',
        method: 'get'
      })
        .then((response) => {
          this.users_num = response.data.count
          this.users = response.data.results
          this.analysisUsers()
        })
        .catch((error) => {
          console.log(error.status)
          console.log(error.response)
        })
    },
    getEquipments () {
      Axios({
        url: 'api/v1/equipment',
        method: 'get',
        params: {
          limit: 10000
        }
      })
        .then((response) => {
          if (response.status === 200) {
            this.equipments = response.data.results
            this.equipments_num = response.data.count
            this.analysisEquipments()
          }
        })
        .catch((error) => {
          console.log(error.status)
          console.log(error.response)
        })
    },
    analysisUsers () {
      this.users_active_num = 0
      this.users_renter_num = 0
      this.users_staff_num = 0
      this.users_superUser_num = 0
      for (const index in this.users) {
        const newUser = this.users[index]
        if (newUser.is_active === true) {
          this.users_active_num++
        }
        if (newUser.is_renter === true) {
          this.users_renter_num++
        }
        if (newUser.is_staff === true) {
          this.users_staff_num++
        }
        if (newUser.is_superuser === true) {
          this.users_superUser_num++
        }
      }
      if (this.users_num !== 0) { this.activeRate = parseInt((this.users_active_num / this.users_num) * 100) } else this.activeRate = 0
    },
    analysisEquipments () {
      this.equip_unrelased_num = 0
      this.equip_unapproved_num = 0
      this.equip_available_num = 0
      this.equip_rented_num = 0
      this.equip_returned_num = 0
      for (const index in this.equipments) {
        const equip = this.equipments[index]
        if (equip.status === 'AVA') {
          this.equip_available_num++
        } else if (equip.status === 'UNR') {
          this.equip_unrelased_num++
        } else if (equip.status === 'UNA') {
          this.equip_unapproved_num++
        } else if (equip.status === 'REN') {
          this.equip_rented_num++
        } else if (equip.status === 'RET') {
          this.equip_returned_num++
        }
      }
      if (this.equipments_num !== 0) { this.utilizationRate = parseInt((this.equip_rented_num / this.equipments_num) * 100) } else this.utilizationRate = 0
    },
    analysisReleaseAppli () {
      for (const index in this.appli_release) {
        const appli = this.appli_release[index]
        // console.log(appli.status)
        if (appli.status === 'ACC') {
          this.appli_accepted_num++
        } else if (appli.status === 'UNA') {
          this.appli_unapproved_num++
        } else if (appli.status === 'REJ') {
          this.appli_rejected_num++
        }
      }
      if (this.applications_num !== 0) { this.approvedRate = parseInt((this.appli_accepted_num / this.applications_num) * 100) } else this.approvedRate = 0
    },
    analysisRenterAppli () {
      for (const index in this.appli_renter) {
        const appli = this.appli_renter[index]
        // console.log(appli.status)
        if (appli.status === 'ACC') {
          this.appli_accepted_num++
        } else if (appli.status === 'UNA') {
          this.appli_unapproved_num++
        } else if (appli.status === 'REJ') {
          this.appli_rejected_num++
        }
      }
      if (this.applications_num !== 0) { this.approvedRate = parseInt((this.appli_accepted_num / this.applications_num) * 100) } else this.approvedRate = 0
    },
    analysisRentAppli () {
      for (const index in this.appli_rent) {
        const appli = this.appli_rent[index]
        // console.log(appli.status)
        if (appli.status === 'ACC') {
          this.appli_accepted_num++
        } else if (appli.status === 'UNA') {
          this.appli_unapproved_num++
        } else if (appli.status === 'REJ') {
          this.appli_rejected_num++
        }
      }
      if (this.applications_num !== 0) { this.approvedRate = parseInt((this.appli_accepted_num / this.applications_num) * 100) } else this.approvedRate = 0
    }
  }
}
</script>
