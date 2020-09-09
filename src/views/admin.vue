// write by xyh
<template>
  <div>
    <user-table></user-table>
    <equipment-table></equipment-table>
    <renter-application-table></renter-application-table>
    <rent-application-table></rent-application-table>
  </div>
</template>

<script>
import userTable from '../components/users-table.vue'
import equipmentTable from '../components/equipment-table.vue'
import renterApplicationTable from '../components/renter-application-table'
import rentApplicationTable from '../components/rent-application-table'
export default {
  data: function () {
    return {
    }
  },
  components: {
    'user-table': userTable,
    'equipment-table': equipmentTable,
    'renter-application-table': renterApplicationTable,
    'rent-application-table': rentApplicationTable
  }
}
</script>
