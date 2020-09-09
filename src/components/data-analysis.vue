<template>
  <div>
    <el-card class='card'
             style="margin-top:50px;">
      <div>
        <h2 style="text-align:center;">
          用户信息
        </h2>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          当前平台用户数量: <el-tag type="warning"
                  style="float:right;margin-right:150px;font-size:26px;">{{users_num}}</el-tag>
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
          当前平台设备数量: <el-tag type="warning"
                  style="float:right;margin-right:150px;font-size:26px;">{{equipments_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          未上线设备数量: <el-tag type="danger"
                  style="float:right;margin-right:150px;font-size:26px;">{{equip_unrelased_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          待审核设备数量: <el-tag type="danger"
                  style="float:right;margin-right:150px;font-size:26px;">{{equip_unapproved_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          可租借设备数量: <el-tag type="success"
                  style="float:right;margin-right:150px;font-size:26px;">{{equip_available_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          已借出设备数量: <el-tag style="float:right;margin-right:150px;font-size:26px;">{{equip_rented_num}}</el-tag>
        </h3>
      </div>
      <div style="margin-left:80px;margin-top:50px;">
        <h3>
          已归还设备数量: <el-tag type="info"
                  style="float:right;margin-right:150px;font-size:26px;">{{equip_returned_num}}</el-tag>
        </h3>
      </div>
      <div style="text-align:center;">
        <el-progress type="circle"
                     :percentage="utilizationRate"
                     :width=226></el-progress>
        <h3>
          设备利用率
        </h3>
      </div>
    </el-card>
    <el-progress type="circle"
                 :percentage="25"
                 :width=226></el-progress>
    <el-progress type="circle"
                 :percentage="100"
                 status="success"
                 :width=226></el-progress>
    <el-progress type="circle"
                 :percentage="50"
                 status="exception"
                 :width=226></el-progress>
    <!-- </el-card> -->
  </div>
</template>

<style scoped>
.el-card {
  margin-right: 10%;
  margin-left: 10%;
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
      users: [],
      equipments: [],
      users_num: null,
      equipments_num: null,
      equip_unrelased_num: null,
      equip_unapproved_num: null,
      equip_available_num: null,
      equip_rented_num: null,
      equip_returned_num: null,
      utilizationRate: 0
    }
  },

  mounted () {
    Axios({
      url: 'api/v1/users',
      method: 'get'
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('succeed users')
          console.log(response.data)
          this.users_num = response.data.count
          this.users = response.data.results
          // console.log(this.users_num)
        }
      })
      .catch((error) => {
        console.log(error.status)
        console.log(error.response)
      })
    Axios({
      url: 'api/v1/equipment',
      method: 'get',
      params: {
        limit: 100
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('succeed')
          console.log(response.data.count)
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
  methods: {
    analysisEquipments () {
      this.equip_unrelased_num = 0
      this.equip_unapproved_num = 0
      this.equip_available_num = 0
      this.equip_rented_num = 0
      this.equip_returned_num = 0
      for (const index in this.equipments) {
        const equip = this.equipments[index]
        console.log(equip.status)
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
    }
  }
}
</script>
