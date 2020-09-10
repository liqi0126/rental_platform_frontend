// write by xyh
<template>
  <div>
    <user-table class="table"
                :pageSize="5"></user-table>
    <equipment-table class="table"
                     :pageSize="5"></equipment-table>
    <renter-application-table :id="-1"
                              :pageSize="5"
                              class="table"></renter-application-table>
    <rent-application-table :id="-1"
                            class="table"
                            :pageSize="5"></rent-application-table>
    <release-application-table :id="-1"
                               class="table"
                               :pageSize="5"></release-application-table>
  </div>
</template>
<style scoped>
.table {
  width: 60%;
  margin-bottom: 200px;
}
</style>
<script>
import userTable from '../components/table/users-table.vue'
import equipmentTable from '../components/table/equipment-table.vue'
import renterApplicationTable from '../components/table/renter-application-table'
import rentApplicationTable from '../components/table/rent-application-table'
import releaseApplicationTable from '../components/table/release-application-table'
export default {
  components: {
    'user-table': userTable,
    'equipment-table': equipmentTable,
    'renter-application-table': renterApplicationTable,
    'rent-application-table': rentApplicationTable,
    'release-application-table': releaseApplicationTable
  },
  created () {
    if (this.$store.getters.getUserKey === 'null') {
      this.$router.push('/login')
    }
    // location.reload()
  }
}
</script>
