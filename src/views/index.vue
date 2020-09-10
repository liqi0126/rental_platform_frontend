<template>
  <div>
      <equipment-table class="table"
                    height="700"
                    :pageSize="10"></equipment-table>
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
import equipmentTable from '../components/table/equipment-table.vue'

export default {
  components: {
    'equipment-table': equipmentTable
  },
  created () {
    if (this.$store.getters.getUserKey === 'null') {
      this.$router.push('/login')
    }
  }
}
</script>
