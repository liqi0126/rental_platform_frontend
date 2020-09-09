// write by xyh
<template>
  <div>
    <user-table></user-table>
    <equipment-table></equipment-table>
    <renter-application-table></renter-application-table>
    <rent-application-table></rent-application-table>
    <release-application-table :id="-1"></release-application-table>
  </div>
</template>

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
  }
}
</script>
