<template>
  <div>
      <rent-application-table :id="-1"
                            class="table"
                            height="700"
                            :pageSize="10"></rent-application-table>
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
import rentApplicationTable from '../components/table/rent-application-table'

export default {
  components: {
    'rent-application-table': rentApplicationTable
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
