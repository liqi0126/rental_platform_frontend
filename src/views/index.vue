<template>
  <div>
    <equipment-table class="table"
                     :height=700
                     :pageSize="10"
                     v-if="this.$store.getters.isAdmin"></equipment-table>
    <normal-equipment-table class="table"
                            :height=700
                            :pageSize="10"
                            v-if="!this.$store.getters.isAdmin"></normal-equipment-table>
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
import normalEquipmentTable from '../components/table/normal-equipment-table.vue'
import equipmentTable from '../components/table/equipment-table'
export default {
  components: {
    'equipment-table': equipmentTable,
    'normal-equipment-table': normalEquipmentTable
  },
  created () {
    if (this.$store.getters.getUserKey === 'null') {
      this.$router.push('/login')
    }
  }
}
</script>
