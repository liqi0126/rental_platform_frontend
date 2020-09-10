<template>
  <div>
      <renter-application-table :id="-1"
                              :pageSize="5"
                              class="table"></renter-application-table>
  </div>
</template>

<style scoped>
.table {
  width: 80%;
  margin-bottom: 200px;
}
.eltabs {
  max-width: 50%
}
</style>

<script>
// import userTable from '../components/table/users-table.vue'
// import equipmentTable from '../components/table/equipment-table.vue'
import renterApplicationTable from '../components/table/renter-application-table'
// import rentApplicationTable from '../components/table/rent-application-table'
// import releaseApplicationTable from '../components/table/release-application-table'

export default {
  data () {
    return {
    //   activeName: 'first'
    }
  },
  components: {
    // 'user-table': userTable
    // 'equipment-table': equipmentTable
    'renter-application-table': renterApplicationTable
    // 'rent-application-table': rentApplicationTable,
    // 'release-application-table': releaseApplicationTable
  },
  methods: {
  },
  created () {
    if (this.$store.getters.getUserKey === 'null') {
      this.$router.push('/login')
    }
    // location.reload()
  }
}
</script>
