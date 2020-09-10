// write by xyh
<template>
  <div>
    <user-table class="table"></user-table>
    <equipment-table class="table"></equipment-table>
    <renter-application-table :id="-1"
                              class="table"></renter-application-table>
    <rent-application-table :id="-1"
                            class="table"></rent-application-table>
    <release-application-table :id="-1"
                               class="table"></release-application-table>
  </div>
</template>
<style scoped>
.table {
  width: 60%;
  margin-bottom: 150px;
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
    console.log(this.$store.getters.getCurrentUser)
    if (this.$store.getters.getUserKey === 'null') {
      this.$router.push('/login')
    }
    // location.reload()
  }
}
</script>
