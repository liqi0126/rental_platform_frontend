<template>
  <div>
    <user-table class="table"
                :height=700
                :pageSize="10"></user-table>
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
import userTable from '../components/table/users-table.vue'

export default {
  components: {
    'user-table': userTable
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
