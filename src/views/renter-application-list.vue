<template>
  <div>
    <renter-application-table :id="-1"
                              :height=700
                              :pageSize="10"
                              class="table"></renter-application-table>
  </div>
</template>

<style scoped>
.table {
  width: 80%;
  margin-bottom: 200px;
}
.eltabs {
  max-width: 50%;
}
</style>

<script>
import renterApplicationTable from '../components/table/renter-application-table'

export default {
  components: {
    'renter-application-table': renterApplicationTable
  },
  methods: {
  },
  created () {
    if (this.$store.getters.getUserKey === 'null') {
      this.$router.push('/login')
    }
  }
}
</script>
